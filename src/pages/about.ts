// About Us Page Template

export function aboutPageTemplate(): string {
  return `
    <div class="about-page">
      <!-- Hero Section -->
      <section class="page-hero">
        <div class="container">
          <h1>About BlissHairStudio</h1>
          <p>Where artistry meets expertise to create your perfect look</p>
        </div>
      </section>

      <!-- Our Story -->
      <section class="our-story">
        <div class="container">
          <div class="story-content">
            <div class="story-text">
              <span class="section-tag">Our Story</span>
              <h2>A Passion for Beautiful Hair</h2>
              <p>Founded with a vision to revolutionize hair care, BlissHairStudio has been serving our community for over 20 years. What started as a dream has blossomed into a sanctuary where clients become family.</p>
              <p>Our journey began with a simple belief: everyone deserves to feel confident and beautiful. Led by Maxine and Carla, our expert stylists bring decades of combined experience, constantly evolving with the latest techniques while honoring timeless craftsmanship.</p>
              <p>Today, we're proud to be an award-winning salon known for our personalized approach, premium products, and the genuine care we show every client who walks through our doors.</p>
            </div>
            <div class="story-image">
              <div class="image-placeholder">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Meet Our Team -->
      <section class="team-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Our Experts</span>
            <h2>Meet Our Master Stylists</h2>
            <div class="divider"></div>
          </div>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-image">
                <div class="avatar">M</div>
              </div>
              <h3>Maxine</h3>
              <p class="team-role">Lead Stylist & Owner</p>
              <p class="team-bio">With over 20 years of experience, Maxine brings unparalleled expertise in color treatments and precision cuts. Her warm personality makes every client feel like family.</p>
              <div class="team-specialties">
                <span>Color Expert</span>
                <span>Precision Cuts</span>
                <span>Consultations</span>
              </div>
            </div>
            <div class="team-card">
              <div class="team-image">
                <div class="avatar">C</div>
              </div>
              <h3>Carla</h3>
              <p class="team-role">Senior Stylist</p>
              <p class="team-bio">Carla's creative vision and technical mastery make her a favorite among clients seeking transformative styles. She specializes in modern cuts and styling.</p>
              <div class="team-specialties">
                <span>Modern Styles</span>
                <span>Hair Repair</span>
                <span>Styling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Values -->
      <section class="values-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">What We Believe</span>
            <h2>Our Values</h2>
            <div class="divider"></div>
          </div>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Excellence</h3>
              <p>We never settle for good enough. Every cut, every color, every style is crafted with meticulous attention to detail.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Personalized Care</h3>
              <p>Your hair is unique, and so is our approach. We listen, understand, and create looks tailored just for you.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Quality Products</h3>
              <p>We use only premium, authentic products that nourish and protect your hair while delivering stunning results.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3>Client Relationships</h3>
              <p>You're not just a client—you're part of our family. We build lasting relationships based on trust and care.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
