export function docsPageTemplate(): string {
  return `
    <div class="docs-page">
      <h1>Internal Docs</h1>
      <p>Private documentation for Bliss Hair Studio admins and staff.</p>
      <div class="docs-grid">
        <div class="docs-card">
          <h2>Start here</h2>
          <ul>
            <li><a href="/docs/staff-calendar">Staff Calendar Guide</a></li>
          </ul>
        </div>
        <div class="docs-card">
          <h2>Admin shortcuts</h2>
          <ul>
            <li>Open Full Calendar: <strong>/admin/calendar</strong></li>
            <li>Export Data: Admin → <strong>Data</strong> tab</li>
          </ul>
        </div>
      </div>

      <div class="docs-card" style="margin-top:20px;">
        <h2>Data & Persistence</h2>
        <p>All data is saved as JSON on the server with atomic writes for reliability. Available API: <code>/api/products</code>, <code>/api/categories</code>, <code>/api/orders</code>, <code>/api/users</code>, <code>/api/passwords</code>, <code>/api/bookings</code>, <code>/api/export</code>.</p>
      </div>
    </div>
  `;
}

export function staffCalendarGuideTemplate(): string {
  return `
    <div class="docs-page">
      <h1>Staff Calendar Guide</h1>
      <p>This guide shows Carla, Zana, and the team how to use the calendar.</p>
      <div class="docs-card">
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
    </div>
  `;
}
