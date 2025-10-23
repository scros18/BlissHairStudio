// Services Page Template

export function servicesPageTemplate(): string {
  return `
    <div class="services-page luxury-services">
      <!-- Hero Section -->
      <section class="page-hero services-hero">
        <div class="container">
          <div class="services-hero-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/>
            </svg>
            <span>Premium Services</span>
          </div>
          <h1>Our Menu of Luxury</h1>
          <p>Experience award-winning hair care artistry</p>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="services-content">
        <div class="container">
          <div class="services-grid">
            <!-- Hair Styling -->
            <div class="service-category-card">
              <div class="service-icon">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <h2>Hair Styling</h2>
              </div>
              <p class="service-description">Transform your look with our expert styling services</p>
              <ul class="service-list">
                <li>
                  <strong>Women's Cut & Style</strong>
                  <span class="service-price">From £45</span>
                  <p>Personalized cuts tailored to your face shape and lifestyle</p>
                </li>
                <li>
                  <strong>Men's Cut & Style</strong>
                  <span class="service-price">From £30</span>
                  <p>Modern cuts and classic styles with precision</p>
                </li>
                <li>
                  <strong>Blow Dry & Style</strong>
                  <span class="service-price">From £35</span>
                  <p>Professional styling for any occasion</p>
                </li>
                <li>
                  <strong>Special Occasion Styling</strong>
                  <span class="service-price">From £60</span>
                  <p>Elegant updos and styles for weddings, proms, and events</p>
                </li>
              </ul>
            </div>

            <!-- Precision Cuts -->
            <div class="service-category-card">
              <div class="service-icon">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="18" cy="18" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                <h2>Precision Cuts</h2>
              </div>
              <p class="service-description">Expert cutting techniques for flawless results</p>
              <ul class="service-list">
                <li>
                  <strong>Precision Bob</strong>
                  <span class="service-price">From £55</span>
                  <p>Sharp, modern bobs with perfect angles</p>
                </li>
                <li>
                  <strong>Layered Cuts</strong>
                  <span class="service-price">From £50</span>
                  <p>Add movement and dimension to your hair</p>
                </li>
                <li>
                  <strong>Fringe/Bangs</strong>
                  <span class="service-price">From £20</span>
                  <p>Frame your face with perfectly cut bangs</p>
                </li>
                <li>
                  <strong>Texture & Movement</strong>
                  <span class="service-price">From £60</span>
                  <p>Specialized cutting for added texture</p>
                </li>
              </ul>
            </div>

            <!-- Color Treatments -->
            <div class="service-category-card">
              <div class="service-icon">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 7h-9M14 17H5M17 3v18M17 3a2 2 0 1 1 0 0M17 21a2 2 0 1 1 0 0"/>
                </svg>
                <h2>Color Treatments</h2>
              </div>
              <p class="service-description">Beautiful, vibrant color that lasts</p>
              <ul class="service-list">
                <li>
                  <strong>Full Color</strong>
                  <span class="service-price">From £70</span>
                  <p>Complete color transformation with premium products</p>
                </li>
                <li>
                  <strong>Highlights/Lowlights</strong>
                  <span class="service-price">From £85</span>
                  <p>Add dimension with expertly placed highlights</p>
                </li>
                <li>
                  <strong>Balayage</strong>
                  <span class="service-price">From £120</span>
                  <p>Hand-painted, natural-looking color</p>
                </li>
                <li>
                  <strong>Root Touch-Up</strong>
                  <span class="service-price">From £45</span>
                  <p>Keep your color looking fresh</p>
                </li>
                <li>
                  <strong>Toner & Gloss</strong>
                  <span class="service-price">From £35</span>
                  <p>Enhance shine and neutralize unwanted tones</p>
                </li>
              </ul>
            </div>

            <!-- Repair Treatments -->
            <div class="service-category-card">
              <div class="service-icon">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h2>Repair Treatments</h2>
              </div>
              <p class="service-description">Restore health and vitality to damaged hair</p>
              <ul class="service-list">
                <li>
                  <strong>Deep Conditioning Treatment</strong>
                  <span class="service-price">From £40</span>
                  <p>Intensive moisture therapy for dry, damaged hair</p>
                </li>
                <li>
                  <strong>Keratin Treatment</strong>
                  <span class="service-price">From £150</span>
                  <p>Smooth, frizz-free hair for months</p>
                </li>
                <li>
                  <strong>Olaplex Treatment</strong>
                  <span class="service-price">From £45</span>
                  <p>Rebuild broken bonds and restore strength</p>
                </li>
                <li>
                  <strong>Scalp Treatment</strong>
                  <span class="service-price">From £35</span>
                  <p>Nourish and revitalize your scalp</p>
                </li>
              </ul>
            </div>
          </div>

          <!-- Booking CTA -->
          <div class="services-cta">
            <h2>Ready to Book?</h2>
            <p>Let us help you achieve your hair goals</p>
            <a href="/#contact" class="btn btn-primary btn-lg">
              Book Consultation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}
