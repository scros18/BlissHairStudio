/**
 * Calendar/Bookings Management for Admin Panel
 * Mobile-First Design with Customer Integration
 */

import { bookingManagerAPI, type Booking } from '../utils/bookingManagerAPI';
import { authManagerAPI } from '../utils/authManagerAPI';

let currentWeekStart: Date = new Date();
let editingBooking: Booking | null = null;

/**
 * Initialize the calendar section
 */
export async function initializeCalendar(): Promise<void> {
  console.log('🗓️ Initializing Calendar Section...');
  
  // Set current week to start of this week (Sunday)
  const today = new Date();
  currentWeekStart = getStartOfWeek(today);
  
  // Load bookings from API
  await bookingManagerAPI.loadBookings();
  
  // Setup event listeners
  setupCalendarEventListeners();
  
  // Render calendar
  renderCalendar();
  renderUpcomingAppointments();
  
  console.log('✅ Calendar initialized successfully');
}

/**
 * Setup all event listeners for calendar
 */
function setupCalendarEventListeners(): void {
  // Navigation buttons
  const prevWeekBtn = document.getElementById('prevWeekBtn');
  const nextWeekBtn = document.getElementById('nextWeekBtn');
  const todayBtn = document.getElementById('todayBtn');
  
  prevWeekBtn?.addEventListener('click', () => {
    currentWeekStart = addDays(currentWeekStart, -7);
    renderCalendar();
  });
  
  nextWeekBtn?.addEventListener('click', () => {
    currentWeekStart = addDays(currentWeekStart, 7);
    renderCalendar();
  });
  
  todayBtn?.addEventListener('click', () => {
    const today = new Date();
    currentWeekStart = getStartOfWeek(today);
    renderCalendar();
  });
  
  // Add booking button
  const addBookingBtn = document.getElementById('addBookingBtn');
  addBookingBtn?.addEventListener('click', () => openBookingModal());
  
  // Booking modal
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const cancelBookingBtn = document.getElementById('cancelBookingBtn');
  const bookingForm = document.getElementById('bookingForm') as HTMLFormElement;
  const deleteBookingBtn = document.getElementById('deleteBookingBtn');
  
  closeBookingModal?.addEventListener('click', () => closeModal(bookingModal!));
  cancelBookingBtn?.addEventListener('click', () => closeModal(bookingModal!));
  
  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeModal(bookingModal);
    }
  });
  
  // Form submission
  bookingForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveBooking();
  });
  
  // Delete booking
  deleteBookingBtn?.addEventListener('click', async () => {
    if (editingBooking && confirm('Are you sure you want to delete this booking?')) {
      await bookingManagerAPI.deleteBooking(editingBooking.id);
      closeModal(bookingModal!);
      renderCalendar();
      renderUpcomingAppointments();
    }
  });
  
  // Date change - update available time slots
  const bookingDate = document.getElementById('bookingDate') as HTMLInputElement;
  const bookingDuration = document.getElementById('bookingDuration') as HTMLSelectElement;
  
  bookingDate?.addEventListener('change', () => updateAvailableTimeSlots());
  bookingDuration?.addEventListener('change', () => updateAvailableTimeSlots());
}

/**
 * Render the calendar week view
 */
function renderCalendar(): void {
  const calendarView = document.getElementById('calendarWeekView');
  const weekDisplay = document.getElementById('currentWeekDisplay');
  
  if (!calendarView || !weekDisplay) return;
  
  // Update week display
  const weekEnd = addDays(currentWeekStart, 6);
  weekDisplay.textContent = formatWeekRange(currentWeekStart, weekEnd);
  
  // Get week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Build calendar header
  let headerHTML = '<div class="calendar-header">';
  headerHTML += '<div class="calendar-time-label">Time</div>';
  
  weekDates.forEach(date => {
    const isToday = date.getTime() === today.getTime();
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const dayNumber = date.getDate();
    
    headerHTML += `
      <div class="calendar-day-header ${isToday ? 'today' : ''}">
        <div class="calendar-day-name">${dayName}</div>
        <div class="calendar-day-number">${dayNumber}</div>
      </div>
    `;
  });
  headerHTML += '</div>';
  
  // Build calendar body (9 AM - 6 PM)
  let bodyHTML = '<div class="calendar-body">';
  const startHour = 9;
  const endHour = 18;
  
  for (let hour = startHour; hour < endHour; hour++) {
    // Time slot label
    const timeLabel = `${hour.toString().padStart(2, '0')}:00`;
    bodyHTML += `<div class="calendar-time-slot">${timeLabel}</div>`;
    
    // Cells for each day
    weekDates.forEach(date => {
      const dateStr = formatDate(date);
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      
      // Check for bookings at this time
      const bookingsAtTime = bookingManagerAPI
        .getBookingsForDate(dateStr)
        .filter(booking => {
          const bookingHour = parseInt(booking.time.split(':')[0]);
          const bookingDuration = booking.duration / 60; // Convert to hours
          return hour >= bookingHour && hour < bookingHour + bookingDuration;
        });
      
      const hasBooking = bookingsAtTime.length > 0;
      const booking = bookingsAtTime[0];
      
      if (hasBooking && parseInt(booking.time.split(':')[0]) === hour) {
        // Render booking card (only at start time)
        bodyHTML += `
          <div class="calendar-cell has-booking" data-date="${dateStr}" data-time="${timeStr}">
            <div class="booking-card status-${booking.status}" data-booking-id="${booking.id}">
              <div class="booking-time">${booking.time}</div>
              <div class="booking-customer">${booking.customerName}</div>
              <div class="booking-service">${booking.service}</div>
            </div>
          </div>
        `;
      } else if (hasBooking) {
        // Part of an existing booking (don't allow click)
        bodyHTML += `<div class="calendar-cell has-booking" data-date="${dateStr}" data-time="${timeStr}"></div>`;
      } else {
        // Empty slot (allow click to book)
        bodyHTML += `<div class="calendar-cell" data-date="${dateStr}" data-time="${timeStr}"></div>`;
      }
    });
  }
  bodyHTML += '</div>';
  
  calendarView.innerHTML = headerHTML + bodyHTML;
  
  // Add click listeners to calendar cells and booking cards
  calendarView.querySelectorAll('.calendar-cell:not(.has-booking)').forEach(cell => {
    cell.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const date = target.dataset.date!;
      const time = target.dataset.time!;
      openBookingModal(date, time);
    });
  });
  
  calendarView.querySelectorAll('.booking-card').forEach(card => {
    card.addEventListener('click', async (e) => {
      e.stopPropagation();
      const bookingId = (e.currentTarget as HTMLElement).dataset.bookingId!;
      const booking = bookingManagerAPI.getAllBookings().find(b => b.id === bookingId);
      if (booking) {
        openBookingModal(undefined, undefined, booking);
      }
    });
  });
}

/**
 * Render upcoming appointments list
 */
function renderUpcomingAppointments(): void {
  const upcomingList = document.getElementById('upcomingList');
  if (!upcomingList) return;
  
  const upcomingBookings = bookingManagerAPI.getUpcomingBookings(20);
  
  if (upcomingBookings.length === 0) {
    upcomingList.innerHTML = `
      <div class="upcoming-empty">
        <div class="upcoming-empty-icon">📅</div>
        <p>No upcoming appointments</p>
      </div>
    `;
    return;
  }
  
  upcomingList.innerHTML = upcomingBookings.map(booking => {
    const date = new Date(booking.date + 'T00:00:00');
    const dateStr = date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
    
    return `
      <div class="upcoming-booking-card" data-booking-id="${booking.id}">
        <div class="upcoming-booking-info">
          <div class="upcoming-booking-datetime">
            📅 ${dateStr} at ${booking.time}
          </div>
          <div class="upcoming-booking-customer">${booking.customerName}</div>
          <div class="upcoming-booking-service">${booking.service} (${booking.duration} min)</div>
        </div>
        <div class="upcoming-booking-status ${booking.status}">${booking.status}</div>
      </div>
    `;
  }).join('');
  
  // Add click listeners
  upcomingList.querySelectorAll('.upcoming-booking-card').forEach(card => {
    card.addEventListener('click', () => {
      const bookingId = (card as HTMLElement).dataset.bookingId!;
      const booking = bookingManagerAPI.getAllBookings().find(b => b.id === bookingId);
      if (booking) {
        openBookingModal(undefined, undefined, booking);
      }
    });
  });
}

/**
 * Open booking modal (create new or edit existing)
 */
function openBookingModal(date?: string, time?: string, booking?: Booking): void {
  const modal = document.getElementById('bookingModal');
  const form = document.getElementById('bookingForm') as HTMLFormElement;
  const title = document.getElementById('bookingModalTitle');
  const deleteBtn = document.getElementById('deleteBookingBtn');
  
  if (!modal || !form || !title || !deleteBtn) return;
  
  // Reset form
  form.reset();
  editingBooking = booking || null;
  
  if (booking) {
    // Edit mode
    title.textContent = 'Edit Appointment';
    deleteBtn.style.display = 'flex';
    
    // Populate form
    (document.getElementById('bookingId') as HTMLInputElement).value = booking.id;
    (document.getElementById('bookingCustomerName') as HTMLInputElement).value = booking.customerName;
    (document.getElementById('bookingCustomerPhone') as HTMLInputElement).value = booking.customerPhone;
    (document.getElementById('bookingCustomerEmail') as HTMLInputElement).value = booking.customerEmail || '';
    (document.getElementById('bookingService') as HTMLSelectElement).value = booking.service;
    (document.getElementById('bookingDate') as HTMLInputElement).value = booking.date;
    (document.getElementById('bookingDuration') as HTMLSelectElement).value = booking.duration.toString();
    (document.getElementById('bookingStatus') as HTMLSelectElement).value = booking.status;
    (document.getElementById('bookingNotes') as HTMLTextAreaElement).value = booking.notes || '';
    
    // Update available time slots, then set time
    updateAvailableTimeSlots();
    setTimeout(() => {
      (document.getElementById('bookingTime') as HTMLSelectElement).value = booking.time;
    }, 100);
  } else {
    // Create mode
    title.textContent = 'Book New Appointment';
    deleteBtn.style.display = 'none';
    
    if (date) {
      (document.getElementById('bookingDate') as HTMLInputElement).value = date;
    }
    
    updateAvailableTimeSlots();
    
    if (time) {
      setTimeout(() => {
        (document.getElementById('bookingTime') as HTMLSelectElement).value = time;
      }, 100);
    }
  }
  
  openModal(modal);
}

/**
 * Update available time slots based on selected date and duration
 */
function updateAvailableTimeSlots(): void {
  const dateInput = document.getElementById('bookingDate') as HTMLInputElement;
  const durationSelect = document.getElementById('bookingDuration') as HTMLSelectElement;
  const timeSelect = document.getElementById('bookingTime') as HTMLSelectElement;
  
  if (!dateInput || !durationSelect || !timeSelect) return;
  
  const date = dateInput.value;
  const duration = parseInt(durationSelect.value);
  
  if (!date || !duration) {
    timeSelect.innerHTML = '<option value="">Select time...</option>';
    return;
  }
  
  // Get available time slots
  const availableSlots = bookingManagerAPI.getAvailableTimeSlots(date, duration);
  
  // Filter out slots that conflict with existing bookings (except current booking)
  const filteredSlots = availableSlots.filter(slot => {
    return bookingManagerAPI.isTimeSlotAvailable(date, slot, duration, editingBooking?.id);
  });
  
  // Populate time select
  const currentValue = timeSelect.value;
  timeSelect.innerHTML = '<option value="">Select time...</option>';
  
  filteredSlots.forEach(slot => {
    const option = document.createElement('option');
    option.value = slot;
    option.textContent = slot;
    timeSelect.appendChild(option);
  });
  
  // Restore previous value if still available
  if (currentValue && filteredSlots.includes(currentValue)) {
    timeSelect.value = currentValue;
  }
}

/**
 * Save booking (create or update)
 */
async function saveBooking(): Promise<void> {
  const form = document.getElementById('bookingForm') as HTMLFormElement;
  const formData = new FormData(form);
  
  const bookingData = {
    customerName: formData.get('customerName') as string,
    customerPhone: formData.get('customerPhone') as string,
    customerEmail: (formData.get('customerEmail') as string) || undefined,
    service: formData.get('service') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    duration: parseInt(formData.get('duration') as string),
    notes: (formData.get('notes') as string) || undefined,
    status: (formData.get('status') as string) as 'confirmed' | 'completed' | 'cancelled' | 'no-show',
  };
  
  // Validation
  if (!bookingData.customerName || !bookingData.customerPhone || 
      !bookingData.service || !bookingData.date || !bookingData.time) {
    alert('Please fill in all required fields');
    return;
  }
  
  try {
    let booking: Booking;
    
    if (editingBooking) {
      // Update existing booking
      booking = await bookingManagerAPI.updateBooking(editingBooking.id, bookingData);
      console.log('✅ Booking updated:', booking);
    } else {
      // Create new booking
      booking = await bookingManagerAPI.createBooking(bookingData);
      console.log('✅ Booking created:', booking);
    }
    
    // If customer email provided, link booking to user account
    if (bookingData.customerEmail) {
      await linkBookingToCustomerAccount(booking);
    }
    
    // Close modal and refresh
    closeModal(document.getElementById('bookingModal')!);
    renderCalendar();
    renderUpcomingAppointments();
    
    alert('Booking saved successfully! ✨');
  } catch (error) {
    console.error('❌ Error saving booking:', error);
    alert('Failed to save booking. Please try again.');
  }
}

/**
 * Link booking to customer account if they have one
 * This allows customers to see their bookings in their profile!
 */
async function linkBookingToCustomerAccount(booking: Booking): Promise<void> {
  if (!booking.customerEmail) return;
  
  try {
    console.log(`🔗 Linking booking to customer account: ${booking.customerEmail}`);
    
    // Check if user exists with this email
    const users = await authManagerAPI.getAllUsers();
    const user = users.find((u: any) => u.email.toLowerCase() === booking.customerEmail!.toLowerCase());
    
    if (user) {
      // Add booking ID to user via API
      await authManagerAPI.addBookingToUser(user.id, booking.id);
      console.log(`✅ Booking linked to user account: ${user.name}`);
    } else {
      console.log(`ℹ️ No user account found for ${booking.customerEmail} - booking created without account link`);
    }
  } catch (error) {
    console.error('❌ Error linking booking to customer:', error);
    // Don't throw - booking is still created successfully
  }
}

/**
 * Helper: Open modal with animation
 */
function openModal(modal: HTMLElement): void {
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

/**
 * Helper: Close modal with animation
 */
function closeModal(modal: HTMLElement): void {
  modal.classList.add('closing');
  
  setTimeout(() => {
    modal.classList.remove('active', 'closing');
    document.body.classList.remove('modal-open');
  }, 300);
}

/**
 * Helper: Get start of week (Sunday)
 */
function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

/**
 * Helper: Add days to date
 */
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Helper: Format date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Helper: Format week range display
 */
function formatWeekRange(start: Date, end: Date): string {
  const startStr = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const endStr = end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${startStr} - ${endStr}`;
}

/**
 * Export refresh function for use in admin.ts
 */
export function refreshCalendar(): void {
  renderCalendar();
  renderUpcomingAppointments();
}
