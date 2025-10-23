// Contact Page Template

export function contactPageTemplate(): string {
  return `
    <div class="contact-page">
      <!-- Hero Section -->
      <section class="page-hero">
        <div class="container">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      <!-- Contact Content -->
      <section class="contact-page-content">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-info-section">
              <h2>Visit Our Studio</h2>
              <div class="contact-cards">
                <div class="contact-info-card">
                  <div class="contact-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <h3>Location</h3>
                  <p>Find us on Google Maps</p>
                  <a href="https://www.google.com/maps/place/Bliss+hair+studio/@52.9542908,-0.1696088,17z" target="_blank" class="contact-link">Get Directions →</a>
                </div>
                <div class="contact-info-card">
                  <div class="contact-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <h3>Phone</h3>
                  <p>Give us a call</p>
                  <a href="tel:+441234567890" class="contact-link">+44 (0) 123 456 7890</a>
                </div>
                <div class="contact-info-card">
                  <div class="contact-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <h3>Email</h3>
                  <p>Send us a message</p>
                  <a href="mailto:hello@blisshairstudio.com" class="contact-link">hello@blisshairstudio.com</a>
                </div>
                <div class="contact-info-card">
                  <div class="contact-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <h3>Opening Hours</h3>
                  <p>Monday - Saturday<br>9:00 AM - 6:00 PM</p>
                  <p class="text-muted">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div class="contact-form-section">
              <h2>Send Us a Message</h2>
              <form class="page-contact-form" id="pageContactForm">
                <div class="form-group">
                  <label class="form-label required">Your Name</label>
                  <input type="text" class="form-input" name="name" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">Email Address</label>
                  <input type="email" class="form-input" name="email" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-input" name="phone">
                </div>
                <div class="form-group">
                  <label class="form-label required">Message</label>
                  <textarea class="form-input" name="message" rows="6" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-lg btn-block">
                  Send Message
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
