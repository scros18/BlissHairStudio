// Products Page Template - Luxury Gucci-inspired Design
export const productsPageTemplate = (): string => {
  return `
    <!-- Luxury Products Page -->
    <div class="luxury-products-page">
        <!-- Coupon Banner -->
        <div class="luxury-coupon-banner" id="couponBanner">
            <div class="luxury-coupon-content">
                <svg class="luxury-coupon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span class="luxury-coupon-text">Use code</span>
                <button class="luxury-coupon-code" id="couponCode" title="Click to copy">WELCOME10</button>
                <span class="luxury-coupon-text">for 10% off your first order</span>
            </div>
            <div class="luxury-coupon-copied" id="couponCopied">Copied to clipboard!</div>
        </div>

        <!-- Header -->
        <div class="luxury-products-header">
            <h1 class="luxury-page-title">PREMIUM COLLECTION</h1>
            <div class="luxury-filter">
                <button class="luxury-filter-trigger" id="sortTrigger">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="4" y1="6" x2="16" y2="6"/>
                        <line x1="4" y1="12" x2="16" y2="12"/>
                        <line x1="4" y1="18" x2="16" y2="18"/>
                    </svg>
                    <span>Sort By: Recommended</span>
                </button>
                <button class="luxury-filter-trigger" id="filterTrigger">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                    <span>Filters</span>
                </button>
            </div>
        </div>

        <!-- Products Grid - Dynamically loaded -->
        <div class="luxury-products-grid" id="productsGrid">
            <!-- Products will be loaded dynamically from productManager -->
        </div>

        <!-- Product Detail Modal (Hidden by default) -->
        <div class="luxury-product-detail" id="productDetail" style="display: none;">
            <button class="luxury-close-btn" id="closeDetail">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            
            <div class="luxury-detail-content">
                <div class="luxury-detail-images">
                    <div class="luxury-detail-carousel">
                        <img src="/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg" alt="Product" class="detail-carousel-image active" id="detailImage1">
                        <img src="/Davroe_Repair_Senses_Revitalising_Conditioner_325ml_2__32801.jpg" alt="Product" class="detail-carousel-image" id="detailImage2">
                    </div>
                    <div class="luxury-detail-carousel-nav">
                        <span class="luxury-detail-page">1 / 2</span>
                    </div>
                    <div class="luxury-detail-thumbnails">
                        <button class="luxury-thumbnail active" data-index="0">
                            <img src="/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg" alt="Thumbnail 1">
                        </button>
                        <button class="luxury-thumbnail" data-index="1">
                            <img src="/Davroe_Repair_Senses_Revitalising_Conditioner_325ml_2__32801.jpg" alt="Thumbnail 2">
                        </button>
                    </div>
                </div>

                <div class="luxury-detail-info">
                    <h2 class="luxury-detail-title" id="detailTitle">Moisture Senses Hydrating Conditioner</h2>
                    <p class="luxury-detail-price" id="detailPrice">£29.95</p>

                    <div class="luxury-detail-size">
                        <button class="luxury-size-toggle">
                            <span>Size</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <p class="luxury-size-note">Select the size of the item to see the expected delivery date.</p>
                    </div>

                    <button class="luxury-select-size-btn">SELECT SIZE</button>

                    <div class="luxury-detail-contact">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span>Contact Us</span>
                        <p>Our Client Advisors are available to help you.</p>
                    </div>

                    <div class="luxury-detail-section">
                        <button class="luxury-section-toggle active">
                            <span>PRODUCT DESCRIPTION</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 15 12 9 18 15"></polyline>
                            </svg>
                        </button>
                        <div class="luxury-section-content" style="display: block;">
                            <p>Professional-grade hydrating conditioner enriched with natural ingredients. Deeply nourishes and moisturizes hair, leaving it silky smooth and manageable. Perfect for all hair types, especially dry or damaged hair.</p>
                            <br>
                            <strong>Product Details</strong>
                            <ul>
                                <li>325ml premium formula</li>
                                <li>Enriched with natural oils</li>
                                <li>Sulfate and paraben-free</li>
                                <li>Suitable for daily use</li>
                                <li>Made in Australia</li>
                                <li>Cruelty-free and vegan</li>
                            </ul>
                        </div>
                    </div>

                    <div class="luxury-detail-section">
                        <button class="luxury-section-toggle">
                            <span>Materials & Care</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <div class="luxury-section-content">
                            <p>Apply to clean, damp hair. Massage gently through mid-lengths to ends. Leave for 2-3 minutes. Rinse thoroughly with water.</p>
                        </div>
                    </div>

                    <div class="luxury-detail-section">
                        <button class="luxury-section-toggle">
                            <span>Our Commitment</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <div class="luxury-section-content">
                            <p>We are committed to providing authentic, high-quality hair care products. All products are sourced directly from authorized distributors and come with our 100% authenticity guarantee.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
      // Animate coupon banner on page load
      setTimeout(() => {
        const banner = document.getElementById('couponBanner');
        if (banner) {
          banner.classList.add('show');
        }
      }, 500);

      // Copy coupon code to clipboard
      const couponCode = document.getElementById('couponCode');
      const copiedMessage = document.getElementById('couponCopied');
      
      couponCode?.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText('WELCOME10');
          
          // Show copied message
          copiedMessage.classList.add('show');
          couponCode.classList.add('copied');
          
          // Hide after 2 seconds
          setTimeout(() => {
            copiedMessage.classList.remove('show');
            couponCode.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });

      // Product data
      const productsData = {
        '1': {
          name: 'Moisture Senses Hydrating Conditioner',
          price: '£29.95',
          images: [
            '/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg',
            '/Davroe_Repair_Senses_Revitalising_Conditioner_325ml_2__32801.jpg'
          ],
          description: 'A deeply nourishing conditioner that restores moisture balance and enhances natural shine. Perfect for all hair types, especially dry or damaged hair.',
          details: ['325ml premium formula', 'Enriched with natural oils', 'Sulfate and paraben-free', 'Suitable for daily use', 'Made in Australia', 'Cruelty-free and vegan'],
          materials: 'Apply to clean, damp hair. Massage gently through mid-lengths to ends. Leave for 2-3 minutes. Rinse thoroughly with water.',
          commitment: 'Formulated with natural botanicals and enriched with Quinoa protein. Vegan-friendly, cruelty-free, and Australian-made with sustainable practices.'
        },
        '2': {
          name: 'Protein Hair Rebuilder',
          price: '£39.95',
          images: [
            '/Davroe_Protein_Hair_Rebuilder_200ml__77435.jpg',
            '/__Davroe_Replenish_Jojoba_Crme_Treatment_200ml__26186.jpg'
          ],
          description: 'Intensive protein treatment designed to rebuild and strengthen damaged hair from within. Professional-grade formula for salon results at home.',
          details: ['200ml intensive treatment', 'Hydrolyzed wheat protein', 'Restores hair structure', 'Deep conditioning formula', 'Professional salon-tested', 'Safe for color-treated hair'],
          materials: 'Apply to freshly washed, towel-dried hair. Distribute evenly from roots to ends. Leave on for 5-10 minutes. Rinse thoroughly. Use weekly for best results.',
          commitment: 'Contains hydrolyzed wheat protein and essential amino acids. Professional-grade formula, salon-tested and approved.'
        },
        '3': {
          name: 'Shine Fluid & Thermaprotect Duo',
          price: '£34.95',
          images: [
            '/Davroe_Thermaprotect_200ml__47285.jpg',
            '/Davroe_Shine_Fluid_75ml_2__31573.jpg'
          ],
          description: 'Perfect duo for heat styling protection and brilliant shine finish. Protects hair up to 230°C while adding luxurious glossy finish.',
          details: ['Shine Fluid 75ml + Thermaprotect 200ml', 'Heat protection up to 230°C', 'Infused with argan oil', 'Eliminates frizz and flyaways', 'Lightweight, non-greasy formula', 'UV protection included'],
          materials: 'Thermaprotect: Spray evenly on damp hair before blow-drying or heat styling. Shine Fluid: Apply 1-2 drops to dry hair ends for glossy finish.',
          commitment: 'Infused with argan oil and heat-activated polymers. Eco-conscious packaging, free from harmful sulfates and parabens.'
        }
      };

      // Product carousel functionality - prevent link navigation when clicking dots
      document.querySelectorAll('.luxury-product-card').forEach(card => {
        const images = card.querySelectorAll('.carousel-image');
        const dots = card.querySelectorAll('.luxury-dot');
        
        dots.forEach(dot => {
          dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const index = parseInt(dot.getAttribute('data-index'));
            
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
            
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
          });
        });
      });

      // Section toggles
      document.querySelectorAll('.luxury-section-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
          const content = toggle.nextElementSibling;
          const isActive = toggle.classList.contains('active');
          
          if (isActive) {
            toggle.classList.remove('active');
            content.style.display = 'none';
            toggle.querySelector('svg').style.transform = 'rotate(0deg)';
          } else {
            toggle.classList.add('active');
            content.style.display = 'block';
            toggle.querySelector('svg').style.transform = 'rotate(180deg)';
          }
        });
      });

      // Size toggle
      document.querySelector('.luxury-size-toggle')?.addEventListener('click', function() {
        const svg = this.querySelector('svg');
        const isRotated = svg.style.transform === 'rotate(180deg)';
        svg.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    </script>
  `;
};

