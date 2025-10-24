// About Us Page Template

export function aboutPageTemplate(): string {
  return `
    <div class="about-page">
      <!-- Hero Section -->
      <section class="page-hero about-hero">
        <div class="about-hero-image">
          <img src="/about.jpg" alt="Bliss Hair Studio Interior" loading="eager">
        </div>
        <div class="about-hero-content">
          <div class="container">
            <h1 class="luxury-heading">ABOUT BLISSHAIRSTUDIO</h1>
            <p>Where artistry meets expertise to create your perfect look</p>
          </div>
        </div>
      </section>

      <!-- Our Story -->
      <section class="our-story">
        <div class="container">
          <div class="story-content">
            <div class="story-text">
              <span class="section-tag">Our Story</span>
              <h2 class="luxury-heading">A PASSION FOR BEAUTIFUL HAIR</h2>
              <p>Founded with a vision to revolutionize hair care, BlissHairStudio has been serving our community for over 20 years. What started as a dream has blossomed into a sanctuary where clients become family.</p>
              <p>Our journey began with a simple belief: everyone deserves to feel confident and beautiful. At BlissHairStudio, we're proud to be home to talented stylists including Carla and Jana, who rent chairs in our welcoming salon space, each bringing their unique expertise and passion for hair artistry.</p>
              <p>Today, we're known for our collaborative approach, premium products, and the genuine care we show every client who walks through our doors. Our team of skilled professionals is dedicated to creating beautiful transformations and lasting relationships.</p>
            </div>
            <div class="story-image">
              <img src="/about.jpg" alt="Bliss Hair Studio" loading="lazy">
            </div>
          </div>
        </div>
      </section>

      <!-- Meet Our Team -->
      <section class="team-section">
        <div class="container">
          <div class="section-header centered">
            <span class="section-tag">OUR FOUNDER</span>
            <h2 class="luxury-heading">MEET MAXINE CROSTON</h2>
            <div class="divider"></div>
            <p class="section-description">The visionary behind BlissHairStudio - creating a space where talent and beauty flourish</p>
          </div>
          
          <!-- Owner Spotlight -->
          <div class="owner-spotlight">
            <div class="owner-card">
              <div class="owner-image">
                <div class="avatar-photo">
                  <img src="/maxine.jpeg" alt="Maxine Croston - Founder" loading="lazy">
                </div>
                <div class="owner-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/>
                  </svg>
                  Owner
                </div>
              </div>
              <div class="owner-details">
                <h3>Maxine Croston</h3>
                <p class="owner-title">Founder & Master Stylist</p>
                <p class="owner-bio">With over 20 years of passion and dedication, Maxine founded BlissHairStudio with a singular vision: to create a welcoming sanctuary where talented stylists can thrive and clients become family. Her expertise in color treatments and precision cuts, combined with her warm personality, has made BlissHairStudio the go-to destination for hair transformations in the community.</p>
                <div class="owner-achievements">
                  <div class="achievement-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/>
                    </svg>
                    <span>20+ Years Experience</span>
                  </div>
                  <div class="achievement-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span>10,000+ Happy Clients</span>
                  </div>
                  <div class="achievement-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>Certified Color Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Our Team -->
          <div class="section-header" style="margin-top: 80px;">
            <span class="section-tag">Our Talented Stylists</span>
            <h2>Chair Rental Artists</h2>
            <div class="divider"></div>
          </div>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-image">
                <div class="avatar-photo">
                  <img src="/carla.jpeg" alt="Carla - Chair Rental Stylist" loading="lazy">
                </div>
              </div>
              <h3>Carla</h3>
              <p class="team-role">Chair Rental Stylist</p>
              <p class="team-bio">Carla brings creative vision and technical mastery to BlissHairStudio. Her expertise in modern cuts and color transformations makes her a favorite among clients seeking fresh, contemporary styles.</p>
              <div class="team-specialties">
                <span>Modern Cuts</span>
                <span>Color Expert</span>
                <span>Styling</span>
              </div>
            </div>
            <div class="team-card">
              <div class="team-image">
                <div class="avatar-photo">
                  <img src="/jana.jpeg" alt="Jana - Chair Rental Stylist" loading="lazy">
                </div>
              </div>
              <h3>Jana</h3>
              <p class="team-role">Chair Rental Stylist</p>
              <p class="team-bio">Jana's passion for hair artistry and attention to detail ensure every client leaves feeling beautiful. She specializes in precision styling and personalized consultations.</p>
              <div class="team-specialties">
                <span>Precision Styling</span>
                <span>Hair Treatments</span>
                <span>Consultations</span>
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
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a10 10 0 0 0 0 20"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3>Colour</h3>
              <p>From vibrant transformations to subtle enhancements, we're masters of color artistry, creating looks that complement your unique style.</p>
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
