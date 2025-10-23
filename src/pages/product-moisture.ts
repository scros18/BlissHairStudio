// Product Detail Page - Moisture Senses Hydrating Conditioner
export const productMoistureTemplate = (): string => {
  return `
    <!-- Product Detail Page -->
    <div class="luxury-product-detail-page">
      <div class="product-detail-container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <span>Moisture Senses Hydrating Conditioner</span>
        </nav>

        <div class="product-detail-grid">
          <!-- Product Images -->
          <div class="product-detail-images">
            <div class="product-main-image">
              <img src="/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg" alt="Moisture Senses Hydrating Conditioner" class="main-image active" id="mainImage1">
              <img src="/Davroe_Repair_Senses_Revitalising_Conditioner_325ml_2__32801.jpg" alt="Conditioner Alternative View" class="main-image" id="mainImage2">
            </div>
            
            <div class="product-thumbnails">
              <button class="thumbnail active" data-index="0">
                <img src="/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg" alt="Thumbnail 1">
              </button>
              <button class="thumbnail" data-index="1">
                <img src="/Davroe_Repair_Senses_Revitalising_Conditioner_325ml_2__32801.jpg" alt="Thumbnail 2">
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-detail-info">
            <h1 class="product-detail-title">Moisture Senses Hydrating Conditioner</h1>
            
            <div class="product-detail-rating">
              <div class="stars">★★★★★</div>
              <span class="review-count">(24 Reviews)</span>
            </div>

            <div class="product-detail-pricing">
              <span class="price-old">£34.95</span>
              <span class="price-current">£29.95</span>
              <span class="price-save">Save £5.00</span>
            </div>

            <div class="product-size-selector">
              <label>Size:</label>
              <div class="size-options">
                <button class="size-option active">325ml</button>
                <button class="size-option">1L</button>
              </div>
            </div>

            <div class="product-quantity">
              <label>Quantity:</label>
              <div class="quantity-selector">
                <button class="qty-btn" id="decreaseQty">−</button>
                <input type="number" value="1" min="1" max="10" id="qtyInput" readonly>
                <button class="qty-btn" id="increaseQty">+</button>
              </div>
            </div>

            <div class="product-actions">
              <button class="btn-add-to-bag">Add to Bag</button>
              <button class="btn-wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>

            <div class="product-features">
              <div class="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>100% Authentic Products</span>
              </div>
              <div class="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Free Delivery Over £50</span>
              </div>
              <div class="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Next Day Delivery Available</span>
              </div>
            </div>

            <!-- Collapsible Sections -->
            <div class="product-details-sections">
              <div class="detail-section">
                <button class="section-header">
                  <span>Product Details</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="section-content">
                  <p>Davroe Moisture Senses Hydrating Conditioner is a luxurious treatment designed to deeply nourish and hydrate dry, damaged hair. This professional 325ml conditioner is enriched with natural botanical extracts that restore moisture balance while leaving hair silky smooth and manageable.</p>
                  <ul>
                    <li>325ml professional salon conditioner</li>
                    <li>Suitable for dry, damaged, or color-treated hair</li>
                    <li>Enriched with natural botanical extracts</li>
                    <li>Free from sulfates and parabens</li>
                    <li>Vegan-friendly and cruelty-free</li>
                    <li>Restores moisture balance and shine</li>
                    <li>Leaves hair silky smooth and manageable</li>
                  </ul>
                </div>
              </div>

              <div class="detail-section">
                <button class="section-header">
                  <span>How to Use</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="section-content">
                  <p>After shampooing, apply a generous amount to wet hair. Gently massage through mid-lengths to ends. Leave for 2-3 minutes to allow the nutrients to penetrate. Rinse thoroughly with warm water. For best results, use with Davroe Moisture Senses Shampoo.</p>
                </div>
              </div>

              <div class="detail-section">
                <button class="section-header">
                  <span>Ingredients</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="section-content">
                  <p>Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Amodimethicone, Parfum, Hydrolyzed Quinoa, Argania Spinosa Kernel Oil, Simmondsia Chinensis Seed Oil, and other natural extracts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      // Wait for DOM to be ready
      setTimeout(() => {
        // Thumbnail image switcher
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImages = document.querySelectorAll('.main-image');
        
        thumbnails.forEach((thumb, idx) => {
          thumb.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(thumb.getAttribute('data-index'));
            
            // Remove active class from all images
            mainImages.forEach(img => img.classList.remove('active'));
            // Add active class to selected image
            mainImages[index].classList.add('active');
            
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumb.classList.add('active');
          });
        });

        // Quantity selector
        const qtyInput = document.getElementById('qtyInput');
        const increaseBtn = document.getElementById('increaseQty');
        const decreaseBtn = document.getElementById('decreaseQty');
        
        if (increaseBtn && qtyInput) {
          increaseBtn.addEventListener('click', () => {
            const current = parseInt(qtyInput.value);
            if (current < 10) qtyInput.value = current + 1;
          });
        }
        
        if (decreaseBtn && qtyInput) {
          decreaseBtn.addEventListener('click', () => {
            const current = parseInt(qtyInput.value);
            if (current > 1) qtyInput.value = current - 1;
          });
        }

        // Size selector
        document.querySelectorAll('.size-option').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          });
        });

        // Collapsible sections
        document.querySelectorAll('.section-header').forEach(header => {
          header.addEventListener('click', () => {
            const section = header.parentElement;
            section.classList.toggle('active');
          });
        });

        // Add to Cart functionality
        const addToBagBtn = document.querySelector('.btn-add-to-bag');
        if (addToBagBtn) {
          addToBagBtn.addEventListener('click', () => {
            const quantity = parseInt((document.getElementById('qtyInput') as HTMLInputElement).value) || 1;
            const selectedSize = document.querySelector('.size-option.active')?.textContent || '325ml';
            
            // Import cartManager dynamically
            import('../utils/cartManager').then(({ cartManager }) => {
              const product = {
                id: 'product-moisture-senses',
                title: 'Moisture Senses Hydrating Conditioner',
                price: 29.95,
                image: '/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg',
                size: selectedSize,
                description: 'A deeply nourishing conditioner that restores moisture balance'
              };
              
              for (let i = 0; i < quantity; i++) {
                cartManager.addItem(product);
              }
              
              import('../components/ui').then(({ UI }) => {
                const msg = 'Added ' + quantity + ' x ' + product.title + ' to cart!';
                UI.showNotification(msg, { type: 'success' });
              });
            });
          });
        }
      }, 100);
    </script>
  `;
};
