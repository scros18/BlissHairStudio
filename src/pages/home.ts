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
                <div class="hero-logo-showcase">
                    <div class="logo-glow-ambient"></div>
                    <img src="/logo.png" alt="BlissHairStudio - Premium Hair Salon & Luxury Hair Care" class="hero-logo-elegant" />
                </div>
                <div class="hero-tagline-wrapper">
                    <div class="tagline-glass-backdrop"></div>
                    <h1 class="hero-tagline">
                        <span class="tagline-main">WHERE BEAUTY MEETS LUXURY</span>
                    </h1>
                </div>
                <p class="hero-subtitle">Transform your hair with expert salon services and premium products</p>
                <div class="hero-buttons">
                    <a href="/products" class="btn btn-primary">
                        <span>Shop Premium Collection</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                    <a href="/contact" class="btn btn-secondary-outline">
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
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/>
                            </svg>
                            <span>500+ Reviews</span>
                        </div>
                        <div class="badge-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                            </svg>
                            <span>Authentic Products</span>
                        </div>
                        <div class="badge-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            <span>10,000+ Clients</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-decoration">
            <!-- Detailed Scissors Icon -->
            <div class="floating-icon icon-scissors">
                <svg width="52" height="52" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="25" cy="25" r="12" fill="rgba(0,137,123,0.2)"/>
                    <circle cx="25" cy="75" r="12" fill="rgba(0,137,123,0.2)"/>
                    <circle cx="25" cy="25" r="8"/>
                    <circle cx="25" cy="75" r="8"/>
                    <line x1="85" y1="15" x2="32" y2="68"/>
                    <line x1="32" y1="32" x2="50" y2="50"/>
                    <line x1="60" y1="60" x2="85" y2="85"/>
                    <circle cx="85" cy="15" r="4"/>
                    <circle cx="85" cy="85" r="4"/>
                </svg>
            </div>
            <!-- Detailed Shampoo Bottle Icon -->
            <div class="floating-icon icon-shampoo">
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="35" y="25" width="30" height="10" rx="2" fill="rgba(232,160,191,0.3)"/>
                    <rect x="30" y="35" width="40" height="50" rx="8" fill="rgba(232,160,191,0.2)"/>
                    <path d="M30 35 Q 30 32 32 30 L 68 30 Q 70 32 70 35"/>
                    <line x1="50" y1="18" x2="50" y2="25"/>
                    <circle cx="50" cy="15" r="3"/>
                    <path d="M40 50 Q 50 55 60 50" fill="none"/>
                    <path d="M40 62 Q 50 67 60 62" fill="none"/>
                </svg>
            </div>
            <!-- Detailed Hair Straightener Icon -->
            <div class="floating-icon icon-straightener">
                <svg width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="20" y="15" width="20" height="70" rx="4" fill="rgba(77,182,172,0.2)"/>
                    <rect x="60" y="15" width="20" height="70" rx="4" fill="rgba(77,182,172,0.2)"/>
                    <line x1="25" y1="25" x2="25" y2="75"/>
                    <line x1="30" y1="25" x2="30" y2="75"/>
                    <line x1="35" y1="25" x2="35" y2="75"/>
                    <line x1="65" y1="25" x2="65" y2="75"/>
                    <line x1="70" y1="25" x2="70" y2="75"/>
                    <line x1="75" y1="25" x2="75" y2="75"/>
                    <path d="M40 40 Q 50 35 60 40"/>
                    <circle cx="30" cy="20" r="2" fill="currentColor"/>
                    <circle cx="70" cy="20" r="2" fill="currentColor"/>
                </svg>
            </div>
            <!-- Detailed Hair Dryer Icon -->
            <div class="floating-icon icon-dryer">
                <svg width="54" height="54" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <ellipse cx="35" cy="40" rx="25" ry="20" fill="rgba(0,137,123,0.2)"/>
                    <rect x="50" y="35" width="30" height="10" rx="3"/>
                    <rect x="32" y="55" width="6" height="30" rx="3" fill="rgba(0,137,123,0.1)"/>
                    <circle cx="25" cy="35" r="3"/>
                    <circle cx="35" cy="32" r="3"/>
                    <circle cx="35" cy="45" r="3"/>
                    <circle cx="45" cy="40" r="3"/>
                    <line x1="75" y1="38" x2="85" y2="35"/>
                    <line x1="75" y1="42" x2="85" y2="45"/>
                </svg>
            </div>
            <!-- Detailed Comb Icon -->
            <div class="floating-icon icon-comb">
                <svg width="46" height="46" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="15" y="20" width="70" height="15" rx="3" fill="rgba(255,182,193,0.2)"/>
                    <line x1="25" y1="35" x2="25" y2="75"/>
                    <line x1="35" y1="35" x2="35" y2="80"/>
                    <line x1="45" y1="35" x2="45" y2="82"/>
                    <line x1="55" y1="35" x2="55" y2="80"/>
                    <line x1="65" y1="35" x2="65" y2="75"/>
                    <line x1="75" y1="35" x2="75" y2="70"/>
                    <circle cx="50" cy="27" r="2" fill="currentColor"/>
                </svg>
            </div>
            <!-- Sparkle Icon -->
            <div class="floating-icon icon-sparkle">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 10 L55 40 L85 45 L60 65 L68 95 L50 80 L32 95 L40 65 L15 45 L45 40 Z" opacity="0.8"/>
                    <circle cx="50" cy="50" r="8" fill="white"/>
                </svg>
            </div>
            <!-- Rabbit Icon -->
            <div class="floating-icon icon-rabbit">
                <svg width="45" height="45" viewBox="0 0 100 100" fill="currentColor" opacity="0.6">
                    <ellipse cx="50" cy="60" rx="20" ry="25"/>
                    <circle cx="50" cy="40" r="15"/>
                    <ellipse cx="40" cy="20" rx="6" ry="18" transform="rotate(-15 40 20)"/>
                    <ellipse cx="60" cy="20" rx="6" ry="18" transform="rotate(15 60 20)"/>
                    <circle cx="45" cy="38" r="2" fill="white"/>
                    <circle cx="55" cy="38" r="2" fill="white"/>
                    <circle cx="50" cy="85" r="8"/>
                </svg>
            </div>
            <!-- Elephant Icon -->
            <div class="floating-icon icon-elephant">
                <svg width="50" height="50" viewBox="0 0 100 100" fill="currentColor" opacity="0.6">
                    <ellipse cx="55" cy="50" rx="25" ry="30"/>
                    <circle cx="50" cy="35" r="18"/>
                    <ellipse cx="35" cy="25" rx="8" ry="12"/>
                    <ellipse cx="65" cy="25" rx="8" ry="12"/>
                    <path d="M35 45 Q30 60 28 75" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round"/>
                    <circle cx="45" cy="32" r="2" fill="white"/>
                    <circle cx="55" cy="32" r="2" fill="white"/>
                    <ellipse cx="40" cy="75" rx="8" ry="5"/>
                    <ellipse cx="60" cy="75" rx="8" ry="5"/>
                </svg>
            </div>
        </div>
    </section>

    <!-- Product Showcase Section -->
    <section class="about luxury-products" id="about">
        <div class="container">
            <div class="section-header centered luxury-header">
                <h2 style="font-weight: 300; font-size: 2.5rem; letter-spacing: 2px; text-transform: uppercase; color: #1A1A1A; margin-bottom: 60px; text-align: center;">Featured Collection</h2>
            </div>
            <div class="about-content">
                <div class="about-features-grid luxury-grid">
                    <!-- Product 1: Moisture Conditioner -->
                    <div class="feature feature-card-enhanced product-card">
                        <div class="product-image-carousel">
                            <div class="product-images">
                                <img src="/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg" alt="Davroe Moisture Senses Hydrating Conditioner" class="product-image active" width="259" height="259" loading="lazy">
                                <img src="/Davroe_Repair_Senses_Revitalising_Conditioner_325ml_2__32801.jpg" alt="Davroe Repair Senses Revitalising Conditioner" class="product-image" width="259" height="259" loading="lazy">
                            </div>
                            <div class="product-image-dots">
                                <button class="dot active" data-index="0" aria-label="View image 1 of Moisture Senses Hydrating Conditioner"></button>
                                <button class="dot" data-index="1" aria-label="View image 2 of Moisture Senses Hydrating Conditioner"></button>
                            </div>
                        </div>
                        <h3>Moisture Senses Hydrating Conditioner</h3>
                        <div class="product-rating">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                        </div>
                        <div class="product-pricing">
                            <span class="original-price">£34.95</span>
                            <span class="sale-price">£29.95</span>
                        </div>
                        <a href="/product/moisture-senses" class="product-link">
                            <span>Shop Now</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                    
                    <!-- Product 2: Protein Rebuilder -->
                    <div class="feature feature-card-enhanced product-card">
                        <div class="product-image-carousel">
                            <div class="product-images">
                                <img src="/Davroe_Protein_Hair_Rebuilder_200ml__77435.jpg" alt="Davroe Protein Hair Rebuilder" class="product-image active" width="259" height="259" loading="lazy">
                                <img src="/__Davroe_Replenish_Jojoba_Crme_Treatment_200ml__26186.jpg" alt="Davroe Replenish Jojoba Crème Treatment" class="product-image" width="259" height="259" loading="lazy">
                            </div>
                            <div class="product-image-dots">
                                <button class="dot active" data-index="0" aria-label="View image 1 of Protein Hair Rebuilder"></button>
                                <button class="dot" data-index="1" aria-label="View image 2 of Protein Hair Rebuilder"></button>
                            </div>
                        </div>
                        <h3>Protein Hair Rebuilder</h3>
                        <div class="product-rating">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                        </div>
                        <div class="product-pricing">
                            <span class="original-price">£44.95</span>
                            <span class="sale-price">£39.95</span>
                        </div>
                        <a href="/product/protein-rebuilder" class="product-link">
                            <span>Shop Now</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                    
                    <!-- Product 3: Shine Fluid + Thermaprotect -->
                    <div class="feature feature-card-enhanced product-card">
                        <div class="product-image-carousel">
                            <div class="product-images">
                                <img src="/Davroe_Thermaprotect_200ml__47285.jpg" alt="Davroe Thermaprotect" class="product-image active" width="259" height="259" loading="lazy">
                                <img src="/Davroe_Shine_Fluid_75ml_2__31573.jpg" alt="Davroe Shine Fluid" class="product-image" width="259" height="259" loading="lazy">
                            </div>
                            <div class="product-image-dots">
                                <button class="dot active" data-index="0" aria-label="View image 1 of Shine Fluid & Thermaprotect Duo"></button>
                                <button class="dot" data-index="1" aria-label="View image 2 of Shine Fluid & Thermaprotect Duo"></button>
                            </div>
                        </div>
                        <h3>Shine Fluid & Thermaprotect Duo</h3>
                        <div class="product-rating">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                        </div>
                        <div class="product-pricing">
                            <span class="original-price">£39.90</span>
                            <span class="sale-price">£34.95</span>
                        </div>
                        <a href="/product/shine-duo" class="product-link">
                            <span>Shop Now</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <script>
      // Product image carousel functionality
      document.querySelectorAll('.product-card').forEach(card => {
        const images = card.querySelectorAll('.product-image');
        const dots = card.querySelectorAll('.dot');
        
        dots.forEach(dot => {
          dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            
            // Update active image
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
            
            // Update active dot
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
          });
        });
      });
    </script>
  `;
};
