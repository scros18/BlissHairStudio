# 📅 Bliss Hair Studio - Calendar & Booking System

## Overview
A professional appointment booking system designed specifically for salon management. Built with mobile-first design principles to be the **best salon staff application** - easy, intuitive, and powerful.

---

## 🌟 Key Features

### For Staff (Admin Panel)
- **Week View Calendar**: Visual 7-day calendar with time slots (9 AM - 6 PM)
- **Color-Coded Status**: Instant visual feedback
  - 🟢 Green: Confirmed appointments
  - 🔵 Blue: Completed appointments
  - ⚫ Gray: Cancelled appointments
  - 🔴 Red: No-show appointments
- **Quick Booking**: Click any time slot to instantly create an appointment
- **Easy Navigation**: Previous Week, Next Week, and Today buttons
- **Upcoming List**: See next 20 appointments at a glance
- **Touch-Friendly**: Large buttons and inputs perfect for mobile/tablet
- **Overlap Prevention**: Automatically prevents double-booking

### For Customers (Customer Portal)
- **My Appointments**: Customers can see their bookings when logged in
- **Automatic Linking**: Bookings with email addresses auto-link to customer accounts
- **Appointment Details**: View date, time, service, duration, and notes
- **Status Updates**: See real-time appointment status

---

## 🏗️ System Architecture

### Backend (API Layer)
**File**: `server/index.js`

#### Bookings API Endpoints:
```javascript
GET    /api/bookings          // Get all bookings
POST   /api/bookings          // Create new booking
PUT    /api/bookings/:id      // Update booking
DELETE /api/bookings/:id      // Delete booking
```

#### Data Storage:
- **Location**: `/data/bookings.json`
- **Format**: JSON array of booking objects
- **ID Generation**: `booking_${timestamp}_${random6chars}`

#### Booking Schema:
```typescript
{
  id: string;                    // Unique identifier
  customerName: string;          // Customer's full name
  customerPhone: string;         // Contact number
  customerEmail?: string;        // Optional email (enables account linking!)
  service: string;               // Type of service (Haircut, Color, etc.)
  date: string;                  // ISO date (YYYY-MM-DD)
  time: string;                  // 24h time (HH:MM)
  duration: number;              // Duration in minutes
  notes?: string;                // Optional special requests
  status: 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  createdAt: number;             // Unix timestamp
  updatedAt: number;             // Unix timestamp
}
```

---

### Business Logic Layer
**File**: `src/utils/bookingManagerAPI.ts`

#### Core Methods:

**Data Management:**
- `loadBookings()` - Fetch all bookings from API
- `getAllBookings()` - Get cached bookings
- `createBooking(data)` - Create new booking
- `updateBooking(id, updates)` - Update existing booking
- `deleteBooking(id)` - Remove booking
- `cancelBooking(id)` - Soft delete (mark as cancelled)
- `completeBooking(id)` - Mark as completed

**Query Methods:**
- `getBookingsForDate(date)` - Get all bookings for specific date
- `getBookingsInRange(start, end)` - Get bookings in date range
- `getUpcomingBookings(limit)` - Get next N upcoming bookings (default 10)

**Time Slot Management:**
- `isTimeSlotAvailable(date, time, duration, excludeId?)` - Check if slot is free
- `getAvailableTimeSlots(date, duration)` - Get all available slots for a day

**Business Rules:**
- Operating Hours: 9:00 AM - 6:00 PM
- Time Slot Intervals: 30 minutes
- Overlap Detection: Prevents double-booking automatically
- Duration Options: 30 min, 1h, 1.5h, 2h, 2.5h, 3h

---

### UI Layer
**File**: `src/pages/calendar.ts`

#### Calendar Rendering:
- **Week View**: 7-day grid with time slots
- **Day Headers**: Show day name and date number
- **Today Highlight**: Current day highlighted in green
- **Booking Cards**: Displayed in calendar grid at correct time/date
- **Click Handlers**: 
  - Empty slots → Open booking modal
  - Booking cards → Edit existing booking

#### Modal System:
- **Create Mode**: Pre-fill date/time if clicked from calendar
- **Edit Mode**: Load existing booking data
- **Time Slot Validation**: Only show available times
- **Form Validation**: Required fields enforced
- **Delete Confirmation**: Prevent accidental deletions

#### Customer Integration:
```typescript
async function linkBookingToCustomerAccount(booking: Booking) {
  if (booking.customerEmail) {
    const users = await authManagerAPI.getAllUsers();
    const user = users.find(u => u.email === booking.customerEmail);
    
    if (user) {
      await authManagerAPI.addBookingToUser(user.id, booking.id);
      // Customer can now see booking in their account!
    }
  }
}
```

---

### Customer Portal Integration
**File**: `src/pages/account.ts`

#### Customer Booking View:
```typescript
export async function renderBookings() {
  // Fetches all bookings
  // Filters by user email
  // Displays in customer account
}
```

**Features:**
- Shows all customer's appointments (past and upcoming)
- Color-coded status badges
- Appointment details (date, time, service, notes)
- Sorted by date (upcoming first)
- Indicates past vs. future appointments

---

## 🎨 Styling System

### CSS Files:
- **Main Styles**: `src/styles/calendar.css`
- **Admin Panel**: `src/styles/admin-panel.css`

### Design Principles:
1. **Mobile-First**: Designed for touch interfaces
2. **Large Touch Targets**: Minimum 48px for buttons
3. **Clear Visual Hierarchy**: Important info stands out
4. **Color Coding**: Instant status recognition
5. **Responsive**: Adapts to all screen sizes

### Mobile Optimizations:
- Calendar grid → List view on mobile
- Large form inputs (prevent iOS zoom)
- Full-screen modals on mobile
- Touch-friendly navigation buttons

---

## 🔐 Data Security & Integration

### User Account Linking:
When a booking is created with a customer email:

1. **Check**: System searches for user with matching email
2. **Link**: If found, booking ID added to user's account
3. **Access**: Customer can view booking in their profile
4. **Privacy**: Customers only see their own bookings

### API Integration:
**User Management** (`authManagerAPI`)
- `getAllUsers()` - Get all registered users
- `addBookingToUser(userId, bookingId)` - Link booking to account

**Benefits:**
- Customers see their appointments instantly
- No separate booking portal needed
- Automatic synchronization
- Better customer experience

---

## 📱 Usage Guide

### For Salon Staff:

#### Creating a Booking:
1. Go to Admin Panel → Calendar tab
2. Click "Book Appointment" button OR click empty time slot
3. Fill in customer details:
   - Name (required)
   - Phone (required)
   - Email (optional - enables customer portal access!)
   - Service type
   - Date and time
   - Duration
   - Notes
4. Click "Save Booking"
5. If email provided, customer can view in their account!

#### Editing a Booking:
1. Click on existing booking card
2. Update details
3. Change status if needed
4. Click "Save Booking"

#### Deleting a Booking:
1. Click on booking card
2. Click red "Delete" button
3. Confirm deletion

#### Navigation:
- **Previous Week**: Go back 7 days
- **Next Week**: Go forward 7 days
- **Today**: Jump to current week
- **Upcoming List**: See next appointments below calendar

### For Customers:

#### Viewing Appointments:
1. Log in to your account
2. Go to "My Account" page
3. Your appointments appear automatically!
4. See date, time, service, and status
5. Past appointments shown for reference

#### Making Appointments:
- Call the salon to book
- Staff will add your appointment
- If they add your email, you'll see it instantly in your account!

---

## 🚀 Technical Details

### Performance:
- Lazy loading: Calendar loads only when tab clicked
- API caching: Bookings cached in memory
- Efficient rendering: Only re-renders on changes
- Optimistic UI: Instant feedback on actions

### Browser Support:
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari/iOS: ✅ Full support (with touch optimizations)
- Mobile browsers: ✅ Optimized experience

### Dependencies:
- TypeScript for type safety
- Native Fetch API for HTTP requests
- Native Date API for time calculations
- CSS Grid for calendar layout

---

## 🔧 Configuration

### Business Hours:
Edit in `src/utils/bookingManagerAPI.ts`:
```typescript
const startHour = 9;   // 9 AM
const endHour = 18;    // 6 PM
```

### Time Slot Intervals:
Edit in `src/utils/bookingManagerAPI.ts`:
```typescript
const slotInterval = 30; // 30 minutes
```

### Services List:
Edit in `src/pages/admin.ts` (booking modal):
```html
<select id="bookingService">
  <option value="Haircut">Haircut</option>
  <option value="Hair Color">Hair Color</option>
  <!-- Add more services -->
</select>
```

---

## 🎯 Future Enhancements

### Potential Features:
- ✉️ Email notifications to customers
- 📲 SMS reminders
- 🔁 Recurring appointments
- 📊 Analytics dashboard
- 💰 Payment integration
- 📧 Email confirmation templates
- 🔔 Browser push notifications
- 📅 iCal/Google Calendar sync

---

## 🐛 Troubleshooting

### Bookings not appearing?
- Check API server is running (port 8787)
- Check `/data/bookings.json` exists
- Check browser console for errors

### Customer can't see booking?
- Ensure email was entered when creating booking
- Customer must be logged in with matching email
- Check customer has account registered

### Calendar not loading?
- Check network tab for API errors
- Verify bookingManagerAPI is initialized
- Check calendar tab is clicked

### Time slots not showing?
- Verify date is selected
- Verify duration is selected
- Check for booking conflicts
- Ensure time is within business hours (9 AM - 6 PM)

---

## 💡 Tips for Success

### For Your Mum:
1. **Big Buttons**: Everything is designed to be easy to tap
2. **Visual Feedback**: Colors show status at a glance
3. **No Typos**: Use auto-fill when possible
4. **Add Emails**: Customers love seeing their bookings online!
5. **Weekly View**: See the whole week at once
6. **Upcoming List**: Perfect for checking today's appointments

### Best Practices:
- ✅ Always add customer phone number
- ✅ Add email when available (enables customer portal)
- ✅ Mark completed after appointment
- ✅ Add notes for special requests
- ✅ Check calendar before booking (prevent conflicts)
- ✅ Use "Today" button to jump to current week

---

## 🎸 About This System

**Built by Rocky (Claude) with love for Bliss Hair Studio**

This calendar system was designed from the ground up to be:
- **Simple**: No technical knowledge required
- **Beautiful**: Clean, modern design
- **Functional**: Everything you need, nothing you don't
- **Mobile-Perfect**: Works flawlessly on phone and tablet
- **Customer-Focused**: Customers can see their own bookings

**Goal**: Replace pen and paper with the best salon booking app! 💈✨

---

## 📞 Support

For technical issues or questions:
- Check this documentation first
- Review console logs for error messages
- Verify API server is running
- Check data files in `/data` directory

**Made with 💚 to make salon life easier!**
