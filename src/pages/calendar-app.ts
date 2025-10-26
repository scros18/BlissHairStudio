import { bookingManagerAPI, type Booking } from '../utils/bookingManagerAPI';
import { authManagerAPI } from '../utils/authManagerAPI';
import { router } from '../utils/router';

export function calendarAppTemplate(): string {
  return `
    <div class="calendar-app">
      <div class="calendar-app-header">
        <button class="btn back-btn" id="calendarBackBtn">← Admin</button>
        <div class="calendar-month-switcher">
          <button class="btn" id="prevMonthBtn">‹</button>
          <h1 id="monthTitle"></h1>
          <button class="btn" id="nextMonthBtn">›</button>
        </div>
        <button class="btn today-btn" id="calendarTodayBtn">Today</button>
      </div>
      <div class="calendar-month-grid">
        <div class="grid-head">
          ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => `<div>${d}</div>`).join('')}
        </div>
        <div class="grid-body" id="monthGrid"></div>
      </div>

      <div class="calendar-day-panel">
        <div class="day-panel-header">
          <h2 id="dayTitle"></h2>
          <button class="btn primary" id="addDayBookingBtn">+ New Booking</button>
        </div>
        <div class="day-bookings" id="dayBookings"></div>
      </div>

      <div class="modal" id="calBookingModal">
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="calModalTitle">New Booking</h2>
            <button class="modal-close" id="calModalClose">✕</button>
          </div>
          <form id="calBookingForm">
            <input type="hidden" id="calBookingId" />
            <div class="form-row">
              <label>Name *</label>
              <input id="calName" required />
            </div>
            <div class="form-row">
              <label>Phone *</nlabel>
              <input id="calPhone" required placeholder="07XXX XXXXXX" />
            </div>
            <div class="form-row">
              <label>Email (optional)</label>
              <input id="calEmail" type="email" placeholder="e.g., sarah@example.com" />
            </div>
            <div class="form-row">
              <label>Service *</label>
              <select id="calService" required>
                <option value="">Select…</option>
                <option>Haircut</option>
                <option>Haircut & Blow Dry</option>
                <option>Blow Dry</option>
                <option>Hair Styling</option>
                <option>Hair Color</option>
                <option>Highlights</option>
                <option>Balayage</option>
                <option>Perm</option>
                <option>Hair Treatment</option>
                <option>Keratin Treatment</option>
                <option>Updo</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-row two">
              <div>
                <label>Date *</label>
                <input id="calDate" type="date" required />
              </div>
              <div>
                <label>Time *</label>
                <select id="calTime" required></select>
              </div>
            </div>
            <div class="form-row">
              <label>Duration *</label>
              <select id="calDuration" required>
                <option value="30">30 minutes</option>
                <option value="60" selected>1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div class="form-row">
              <label>Notes</label>
              <textarea id="calNotes" rows="3" placeholder="Any special requests…"></textarea>
            </div>
            <div class="form-row">
              <label>Status</label>
              <select id="calStatus">
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn" id="calDeleteBtn" style="display:none">Delete</button>
              <button type="submit" class="btn primary" id="calSaveBtn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

let currentMonth = new Date();
let selectedDate = new Date();
let editing: Booking | null = null;

export async function initCalendarApp(): Promise<void> {
  await bookingManagerAPI.loadBookings();
  // Wire header
  document.getElementById('calendarBackBtn')?.addEventListener('click', () => router.navigate('/admin'));
  document.getElementById('prevMonthBtn')?.addEventListener('click', () => { currentMonth = addMonths(currentMonth, -1); renderMonth(); });
  document.getElementById('nextMonthBtn')?.addEventListener('click', () => { currentMonth = addMonths(currentMonth, 1); renderMonth(); });
  document.getElementById('calendarTodayBtn')?.addEventListener('click', () => { currentMonth = new Date(); selectedDate = new Date(); renderMonth(); renderDay(); });
  document.getElementById('addDayBookingBtn')?.addEventListener('click', () => openModalForDate(selectedDate));

  const close = () => (document.getElementById('calBookingModal') as HTMLElement).classList.remove('active');
  document.getElementById('calModalClose')?.addEventListener('click', close);
  (document.getElementById('calBookingModal') as HTMLElement)?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('calBookingModal')) close();
  });

  (document.getElementById('calDuration') as HTMLSelectElement)?.addEventListener('change', updateTimes);
  (document.getElementById('calDate') as HTMLInputElement)?.addEventListener('change', updateTimes);

  (document.getElementById('calBookingForm') as HTMLFormElement)?.addEventListener('submit', async (e) => {
    e.preventDefault();
  const b = collectForm();
    if (!b.customerName || !b.customerPhone || !b.service || !b.date || !b.time) return;
    if (editing) {
  const updated = await bookingManagerAPI.updateBooking(editing.id, b);
  await linkToUserIfEmail(updated);
    } else {
  const created = await bookingManagerAPI.createBooking(b);
  await linkToUserIfEmail(created);
    }
    close();
    editing = null;
    await bookingManagerAPI.loadBookings();
    renderMonth();
    renderDay();
  });

  document.getElementById('calDeleteBtn')?.addEventListener('click', async () => {
    if (editing && confirm('Delete this booking?')) {
      await bookingManagerAPI.deleteBooking(editing.id);
      editing = null;
      (document.getElementById('calBookingModal') as HTMLElement).classList.remove('active');
      await bookingManagerAPI.loadBookings();
      renderMonth();
      renderDay();
    }
  });

  renderMonth();
  renderDay();
}

function collectForm(): Omit<Booking, 'id' | 'createdAt' | 'updatedAt'> {
  const customerName = (document.getElementById('calName') as HTMLInputElement).value.trim();
  const customerPhone = (document.getElementById('calPhone') as HTMLInputElement).value.trim();
  const customerEmail = (document.getElementById('calEmail') as HTMLInputElement).value.trim() || undefined;
  const service = (document.getElementById('calService') as HTMLSelectElement).value;
  const date = (document.getElementById('calDate') as HTMLInputElement).value;
  const time = (document.getElementById('calTime') as HTMLSelectElement).value;
  const duration = parseInt((document.getElementById('calDuration') as HTMLSelectElement).value || '60');
  const notes = (document.getElementById('calNotes') as HTMLTextAreaElement).value.trim() || undefined;
  const status = (document.getElementById('calStatus') as HTMLSelectElement).value as Booking['status'];
  return { customerName, customerPhone, customerEmail, service, date, time, duration, notes, status };
}

function renderMonth(): void {
  const monthTitle = document.getElementById('monthTitle');
  const grid = document.getElementById('monthGrid');
  if (!monthTitle || !grid) return;
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  monthTitle.textContent = currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  // compute grid days starting from Monday
  const first = new Date(year, month, 1);
  const start = startOfWeekMonday(first);
  const end = new Date(year, month + 1, 0);
  const last = endOfWeekSunday(end);

  const days: Date[] = [];
  for (let d = new Date(start); d <= last; d = addDays(d, 1)) days.push(new Date(d));

  grid.innerHTML = days.map(d => {
    const inMonth = d.getMonth() === month;
    const isToday = sameDate(d, new Date());
    const dateStr = toYMD(d);
    const bookings = bookingManagerAPI.getBookingsForDate(dateStr);
    return `
      <button class="month-cell ${inMonth ? '' : 'muted'} ${isToday ? 'today' : ''} ${sameDate(d, selectedDate) ? 'selected' : ''}" data-date="${dateStr}">
        <span class="day-num">${d.getDate()}</span>
        ${bookings.length ? `<span class="dot">${bookings.length}</span>` : ''}
      </button>
    `;
  }).join('');

  grid.querySelectorAll<HTMLButtonElement>('.month-cell').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDate = fromYMD(btn.dataset.date!);
      renderMonth();
      renderDay();
    });
  });
}

function renderDay(): void {
  const dayTitle = document.getElementById('dayTitle');
  const list = document.getElementById('dayBookings');
  if (!dayTitle || !list) return;
  dayTitle.textContent = selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const ymd = toYMD(selectedDate);
  const bookings = bookingManagerAPI.getBookingsForDate(ymd).sort((a,b) => a.time.localeCompare(b.time));
  if (!bookings.length) {
    list.innerHTML = `<div class="empty">No bookings yet for this day.</div>`;
    return;
  }
  list.innerHTML = bookings.map(b => `
    <div class="day-booking">
      <div class="time">${b.time}</div>
      <div class="main">
        <div class="name">${b.customerName}</div>
        <div class="service">${b.service} • ${b.duration}m</div>
      </div>
      <div class="actions">
        <button class="btn sm" data-id="${b.id}" data-act="edit">Edit</button>
        <button class="btn sm danger" data-id="${b.id}" data-act="delete">Delete</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll<HTMLButtonElement>('button[data-act]')
    .forEach(btn => btn.addEventListener('click', async () => {
      const id = btn.dataset.id!;
      const act = btn.dataset.act!;
      const b = bookingManagerAPI.getAllBookings().find(x => x.id === id);
      if (!b) return;
      if (act === 'edit') openModalForBooking(b);
      if (act === 'delete' && confirm('Delete this booking?')) {
        await bookingManagerAPI.deleteBooking(id);
        await bookingManagerAPI.loadBookings();
        renderMonth();
        renderDay();
      }
    }));
}

function openModalForDate(date: Date): void {
  editing = null;
  (document.getElementById('calModalTitle') as HTMLElement).textContent = 'New Booking';
  (document.getElementById('calDeleteBtn') as HTMLElement).style.display = 'none';
  (document.getElementById('calBookingForm') as HTMLFormElement).reset();
  (document.getElementById('calDate') as HTMLInputElement).value = toYMD(date);
  updateTimes();
  (document.getElementById('calBookingModal') as HTMLElement).classList.add('active');
}

function openModalForBooking(b: Booking): void {
  editing = b;
  (document.getElementById('calModalTitle') as HTMLElement).textContent = 'Edit Booking';
  (document.getElementById('calDeleteBtn') as HTMLElement).style.display = '';
  (document.getElementById('calBookingForm') as HTMLFormElement).reset();
  (document.getElementById('calBookingId') as HTMLInputElement).value = b.id;
  (document.getElementById('calName') as HTMLInputElement).value = b.customerName;
  (document.getElementById('calPhone') as HTMLInputElement).value = b.customerPhone;
  (document.getElementById('calEmail') as HTMLInputElement).value = b.customerEmail || '';
  (document.getElementById('calService') as HTMLSelectElement).value = b.service;
  (document.getElementById('calDate') as HTMLInputElement).value = b.date;
  (document.getElementById('calDuration') as HTMLSelectElement).value = String(b.duration);
  updateTimes();
  setTimeout(() => (document.getElementById('calTime') as HTMLSelectElement).value = b.time, 50);
  (document.getElementById('calNotes') as HTMLTextAreaElement).value = b.notes || '';
  (document.getElementById('calStatus') as HTMLSelectElement).value = b.status;
  (document.getElementById('calBookingModal') as HTMLElement).classList.add('active');
}

function updateTimes(): void {
  const date = (document.getElementById('calDate') as HTMLInputElement).value;
  const duration = parseInt((document.getElementById('calDuration') as HTMLSelectElement).value || '0');
  const timeSel = document.getElementById('calTime') as HTMLSelectElement;
  timeSel.innerHTML = '<option value="">Select time…</option>';
  if (!date || !duration) return;
  const slots = bookingManagerAPI.getAvailableTimeSlots(date, duration)
    .filter(t => bookingManagerAPI.isTimeSlotAvailable(date, t, duration, editing?.id));
  slots.forEach(t => {
    const o = document.createElement('option');
    o.value = t; o.textContent = t; timeSel.appendChild(o);
  });
}

async function linkToUserIfEmail(booking: Booking | Omit<Booking, 'id'>): Promise<void> {
  const email = (booking as Booking).customerEmail || undefined;
  const id = (booking as Booking).id;
  if (!email || !id) return;
  try {
    const users = await authManagerAPI.getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) await authManagerAPI.addBookingToUser(user.id, id);
  } catch {}
}

// utils
function toYMD(d: Date): string { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function fromYMD(s: string): Date { const [y,m,dd] = s.split('-').map(Number); return new Date(y, m-1, dd); }
function sameDate(a: Date, b: Date): boolean { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function addDays(d: Date, n: number): Date { const r = new Date(d); r.setDate(r.getDate()+n); return r; }
function addMonths(d: Date, n: number): Date { const r = new Date(d); r.setMonth(r.getMonth()+n); return r; }
function startOfWeekMonday(d: Date): Date { const r = new Date(d); const day = (r.getDay()+6)%7; r.setDate(r.getDate()-day); return r; }
function endOfWeekSunday(d: Date): Date { const r = new Date(d); const day = r.getDay(); r.setDate(r.getDate()+(7-day-1)); return r; }
