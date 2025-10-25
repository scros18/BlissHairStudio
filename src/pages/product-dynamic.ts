// Dynamic Product Detail Page
import type { Product } from '../utils/types';

export function dynamicProductTemplate(product: Product): string {
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
          <span>${product.title}</span>
        </nav>

        <div class="product-detail-grid">
          <!-- Product Images -->
          <div class="product-detail-images">
            <div class="product-main-image">
              ${product.image 
                ? `<img src="${product.image}" alt="${product.title}" class="main-image active" id="mainImage1">`
                : `<div class="product-placeholder" style="width:100%;height:500px;background:#F3F4F6;display:flex;align-items:center;justify-content:center;">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                      <path d="M2 17L12 22L22 17"/>
                      <path d="M2 12L12 17L22 12"/>
                    </svg>
                  </div>`
              }
            </div>
            
            ${product.image ? `
              <div class="product-thumbnails">
                <button class="thumbnail active" data-index="0">
                  <img src="${product.image}" alt="Thumbnail 1">
                </button>
              </div>
            ` : ''}
          </div>

          <!-- Product Info -->
          <div class="product-detail-info">
            <h1 class="product-detail-title">${product.title}</h1>
            
            <div class="product-detail-rating">
              <div class="stars">★★★★★</div>
              <span class="review-count">(24 Reviews)</span>
            </div>

            <div class="product-detail-pricing">
              <span class="price-current">£${product.price.toFixed(2)}</span>
            </div>

            ${product.sizes && product.sizes.length > 0 ? `
            <div class="product-size-selector">
              <label>Size:</label>
              <div class="size-options">
                ${product.sizes.map((size, index) => `
                  <button class="size-option ${index === 0 ? 'active' : ''}">${size}</button>
                `).join('')}
              </div>
            </div>
            ` : ''}

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
              <div class="detail-section collapsed">
                <button class="section-header">
                  <span>Product Details</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="section-content">
                  <p>${product.description || 'A premium hair care product designed to nourish and transform your hair. Experience professional salon quality in the comfort of your home.'}</p>
                  <ul>
                    <li>Professional salon-quality formula</li>
                    <li>Suitable for all hair types</li>
                    <li>Free from harsh chemicals</li>
                    <li>Vegan-friendly and cruelty-free</li>
                    <li>Long-lasting results</li>
                  </ul>
                </div>
              </div>

              <div class="detail-section collapsed">
                <button class="section-header">
                  <span>How to Use</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="section-content">
                  <p>Apply to clean, damp hair. Massage gently into hair and scalp. Leave for 2-3 minutes to allow the formula to work. Rinse thoroughly with lukewarm water. For best results, use regularly as part of your hair care routine.</p>
                </div>
              </div>

              <div class="detail-section collapsed">
                <button class="section-header">
                  <span>Shipping & Returns</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="section-content">
                  <p>Free standard delivery on orders over £50. Express delivery available. 30-day money-back guarantee on all products. Easy returns process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
