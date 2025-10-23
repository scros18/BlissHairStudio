// Home Page Template
export const homePageTemplate = (): string => {
  return `
    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-background">
            <div class="hero-pattern"></div>
            <div class="hero-gradient"></div>
        </div>
        <div class="container">
            <div class="hero-content">
                <span class="hero-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/>
                    </svg>
                    Award-Winning Hair Care Excellence
                </span>
                <h1 class="hero-title">
                    Elevate Your Hair,<br/>
                    <span class="highlight-multi">
                        <span class="word-1">Embrace</span>
                        <span class="word-2">Your</span>
                        <span class="word-3">Beauty</span>
                    </span>
                </h1>
                <p class="hero-subtitle">Discover luxury hair care that transforms not just your look, but how you feel. Experience the perfect blend of artistry, science, and personalized care.</p>
                <div class="hero-buttons">
                    <a href="/products" class="btn btn-primary">
                        <span>Shop Premium Collection</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                    <a href="#services" class="btn btn-secondary-outline">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polygon points="10 8 16 12 10 16 10 8"/>
                        </svg>
                        <span>Book a Service</span>
                    </a>
                </div>
                <div class="hero-trust">
                    <div class="trust-badges">
                        <div class="badge-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/>
                            </svg>
                            <span>500+ 5-Star Reviews</span>
                        </div>
                        <div class="badge-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                            </svg>
                            <span>100% Authentic Products</span>
                        </div>
                        <div class="badge-item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            <span>Loved by 10,000+ Clients</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-decoration">
            <div class="floating-shape shape-1">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.2C64.8,55.2,53.8,66.6,40.3,73.8C26.8,81,10.8,84,-5.3,83.3C-21.4,82.6,-42.8,78.2,-58.4,68.4C-74,58.6,-83.8,43.4,-88.3,26.8C-92.8,10.2,-92,-7.8,-85.8,-23.2C-79.6,-38.6,-68,-51.4,-54.3,-58.8C-40.6,-66.2,-25.7,-68.2,-11.3,-72.9C3.1,-77.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
            </div>
            <div class="floating-shape shape-2">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M39.5,-65.6C51.4,-58.5,61.7,-48.3,68.4,-36.2C75.1,-24.1,78.2,-10.1,77.8,3.7C77.4,17.5,73.5,31,65.8,42.2C58.1,53.4,46.6,62.3,33.8,67.8C21,73.3,6.9,75.4,-7.2,74.3C-21.3,73.2,-35.4,69,-47.1,60.9C-58.8,52.8,-68.1,40.8,-73.2,27.3C-78.3,13.8,-79.2,-1.2,-75.3,-14.8C-71.4,-28.4,-62.7,-40.6,-51.5,-48C-40.3,-55.4,-26.6,-57.9,-13.8,-60.5C-1,-63.1,10.9,-65.8,22.7,-64.8C34.5,-63.8,46.2,-59.1,39.5,-65.6Z" transform="translate(100 100)" />
                </svg>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="about-decoration-bg"></div>
        <div class="container">
            <div class="section-header centered">
                <span class="section-tag gradient-tag">Why Choose BlissHairStudio</span>
                <h2>Your Hair Journey <span class="highlight-gradient">Starts Here</span></h2>
                <div class="divider gradient-divider"></div>
                <p class="section-description bold-description">Experience the perfect blend of luxury, expertise, and care that makes BlissHairStudio the ultimate destination for your hair transformation</p>
            </div>
            <div class="about-content">
                <div class="about-features-grid">
                    <div class="feature feature-card-enhanced">
                        <div class="feature-icon-wrap gradient-1">
                            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/>
                            </svg>
                        </div>
                        <h3>Salon-Grade Products</h3>
                        <p>Every product is handpicked from premium brands trusted by professional stylists worldwide. Only the best for your hair.</p>
                        <div class="feature-badge">Premium Quality</div>
                    </div>
                    <div class="feature feature-card-enhanced">
                        <div class="feature-icon-wrap gradient-2">
                            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </div>
                        <h3>Personalized Care</h3>
                        <p>Expert consultations to find the perfect products and treatments for your unique hair type, texture, and goals.</p>
                        <div class="feature-badge">Expert Advice</div>
                    </div>
                    <div class="feature feature-card-enhanced">
                        <div class="feature-icon-wrap gradient-3">
                            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2a10 10 0 0 0-9.95 9h1.64a9 9 0 0 1 16.62 0h1.64A10 10 0 0 0 12 2z"/>
                                <path d="M12 22a10 10 0 0 0 9.95-9h-1.64a9 9 0 0 1-16.62 0H2.05A10 10 0 0 0 12 22z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </div>
                        <h3>Natural & Sustainable</h3>
                        <p>Eco-friendly, cruelty-free products that are as gentle on the planet as they are nourishing for your hair.</p>
                        <div class="feature-badge">Earth-Friendly</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;
};
