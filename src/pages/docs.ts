export function docsPageTemplate(): string {
  return `
    <div class="docs-page container">
      <h1>Internal Docs</h1>
      <p>Private documentation for Bliss Hair Studio admins and staff.</p>
      <ul>
        <li><a href="/docs/staff-calendar">Staff Calendar Guide</a></li>
      </ul>
      <h2>Data & Persistence</h2>
      <p>All data is persisted as JSON files on the server with atomic writes for reliability. The API endpoints are prefixed at /api and include products, categories, orders, users, passwords, and bookings.</p>
      <h2>Admin Shortcuts</h2>
      <ul>
        <li>Open Full Calendar: /admin/calendar</li>
        <li>Export Data: Admin → Data tab</li>
      </ul>
    </div>
  `;
}

export function staffCalendarGuideTemplate(): string {
  return `
    <div class="docs-page container">
      <h1>Staff Calendar Guide</h1>
      <p>This guide shows Carla, Zana, and the team how to use the calendar.</p>
      <h2>Getting Access</h2>
      <ol>
        <li>Create your account on the site.</li>
        <li>An admin toggles your account to Admin in Admin → Users.</li>
        <li>Now visit /admin or the “Admin Panel” button in your Account.</li>
      </ol>
      <h2>Booking an Appointment</h2>
      <ol>
        <li>Go to Admin → Calendar → Open Full Calendar.</li>
        <li>Click a day; on the right, press “+ New Booking”.</li>
        <li>Fill Name, Phone, Service, Date, Time, Duration. Optionally add Email and Notes.</li>
        <li>Press Save. The time grid only shows available slots (no overlap).</li>
      </ol>
      <h2>Editing or Cancelling</h2>
      <ol>
        <li>Click the booking on the day list.</li>
        <li>Choose Edit or Delete. Status can be Confirmed, Completed, Cancelled or No Show.</li>
      </ol>
      <h2>Customer View</h2>
      <p>If you include a customer email, the appointment automatically appears in their Account → Appointments tab.</p>
      <h2>Best Practices</h2>
      <ul>
        <li>Always include phone for fast confirmations.</li>
        <li>Use statuses to track completion and no-shows.</li>
        <li>Use Notes for colour formulas or special requests.</li>
      </ul>
    </div>
  `;
}
