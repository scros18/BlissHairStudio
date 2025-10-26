// Booking Manager - API-backed version for calendar/appointment management
// Integrates with backend API for bookings persistence

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  service: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // 24h format (HH:MM)
  duration: number; // minutes
  notes?: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  createdAt: number;
  updatedAt: number;
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

class BookingManagerAPI {
  private bookings: Booking[] = [];
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.init();
  }

  private async init(): Promise<void> {
    await this.loadBookings();
  }

  async waitForInit(): Promise<void> {
    await this.initialized;
  }

  private async fetchJson(url: string, options?: RequestInit): Promise<any> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  async loadBookings(): Promise<void> {
    try {
      this.bookings = await this.fetchJson(`${API_BASE}/bookings`);
      console.log(`✅ Loaded ${this.bookings.length} bookings from API`);
    } catch (error) {
      console.error('Failed to load bookings:', error);
      this.bookings = [];
    }
  }

  getAllBookings(): Booking[] {
    return [...this.bookings];
  }

  getBookingById(id: string): Booking | undefined {
    return this.bookings.find((b) => b.id === id);
  }

  // Get bookings for a specific date
  getBookingsForDate(date: string): Booking[] {
    return this.bookings.filter((b) => b.date === date && b.status !== 'cancelled');
  }

  // Get bookings for a date range
  getBookingsInRange(startDate: string, endDate: string): Booking[] {
    return this.bookings.filter((b) => {
      return b.date >= startDate && b.date <= endDate && b.status !== 'cancelled';
    });
  }

  // Get upcoming bookings (next 7 days)
  getUpcomingBookings(limit: number = 10): Booking[] {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    return this.bookings
      .filter((b) => b.date >= today && b.date <= nextWeek && b.status === 'confirmed')
      .sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
      })
      .slice(0, limit);
  }

  // Create new booking
  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    try {
      const booking = await this.fetchJson(`${API_BASE}/bookings`, {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });

      this.bookings.push(booking);
      console.log('✅ Booking created:', booking.id);
      return booking;
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  }

  // Update existing booking
  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    try {
      const updated = await this.fetchJson(`${API_BASE}/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      const index = this.bookings.findIndex((b) => b.id === id);
      if (index !== -1) {
        this.bookings[index] = updated;
      }

      console.log('✅ Booking updated:', id);
      return updated;
    } catch (error) {
      console.error('Failed to update booking:', error);
      throw error;
    }
  }

  // Delete booking
  async deleteBooking(id: string): Promise<void> {
    try {
      await this.fetchJson(`${API_BASE}/bookings/${id}`, {
        method: 'DELETE',
      });

      this.bookings = this.bookings.filter((b) => b.id !== id);
      console.log('✅ Booking deleted:', id);
    } catch (error) {
      console.error('Failed to delete booking:', error);
      throw error;
    }
  }

  // Cancel booking (soft delete)
  async cancelBooking(id: string): Promise<Booking> {
    return this.updateBooking(id, { status: 'cancelled' });
  }

  // Mark booking as completed
  async completeBooking(id: string): Promise<Booking> {
    return this.updateBooking(id, { status: 'completed' });
  }

  // Check if time slot is available
  isTimeSlotAvailable(date: string, time: string, duration: number, excludeId?: string): boolean {
    const bookingsForDate = this.getBookingsForDate(date);
    const [hours, minutes] = time.split(':').map(Number);
    const slotStart = hours * 60 + minutes;
    const slotEnd = slotStart + duration;

    return !bookingsForDate.some((booking) => {
      if (excludeId && booking.id === excludeId) return false;
      
      const [bHours, bMinutes] = booking.time.split(':').map(Number);
      const bookingStart = bHours * 60 + bMinutes;
      const bookingEnd = bookingStart + booking.duration;

      // Check for overlap
      return (slotStart < bookingEnd && slotEnd > bookingStart);
    });
  }

  // Get available time slots for a date
  getAvailableTimeSlots(date: string, duration: number = 60): string[] {
    const slots: string[] = [];
    const startHour = 9; // 9 AM
    const endHour = 18; // 6 PM
    const interval = 30; // 30 minute intervals

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const totalMinutes = hour * 60 + minute;
        
        // Don't show slots that would end after closing time
        if (totalMinutes + duration <= endHour * 60) {
          if (this.isTimeSlotAvailable(date, time, duration)) {
            slots.push(time);
          }
        }
      }
    }

    return slots;
  }
}

// Export singleton instance
export const bookingManagerAPI = new BookingManagerAPI();
