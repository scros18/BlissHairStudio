// Products Display Component

import { productManager } from '../utils/productManager';

export class ProductsDisplay {
  private container: HTMLElement | null = null;

  init(containerId: string = 'productsContainer'): void {
    this.container = document.getElementById(containerId);
    if (this.container) {
      this.renderProducts();
    }
  }

  renderProducts(): void {
    if (!this.container) return;
    
    const products = productManager.getAllProducts();
    
    if (products.length === 0) {
      this.container.innerHTML = `
        <div class="products-empty" style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6M12 16h.01"/>
          </svg>
          <h3>No products yet</h3>
          <p>Check back soon for new products!</p>
        </div>
      `;
      return;
    }
    
    // Render products in luxury card style
    this.container.innerHTML = products.map(product => `
      <div class="luxury-product-card" data-product-id="${product.id}">
        <a href="/product/${product.slug ?? this.generateSlug(product.title)}" class="luxury-product-link">
          <div class="luxury-product-image">
            <div class="luxury-product-carousel">
              ${product.image 
                ? `<img src="${product.image}" alt="${product.title}" class="carousel-image active" loading="lazy">` 
                : `<div class="product-placeholder" style="width:100%;height:350px;background:#F3F4F6;display:flex;align-items:center;justify-content:center;">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                      <path d="M2 17L12 22L22 17"/>
                      <path d="M2 12L12 17L22 12"/>
                    </svg>
                  </div>`
              }
            </div>
          </div>
          <div class="luxury-product-info">
            <h3 class="luxury-product-name">${product.title}</h3>
            <div class="luxury-product-stars">★★★★★</div>
            <div class="luxury-product-pricing">
              <span class="luxury-product-price">£${product.price.toFixed(2)}</span>
            </div>
          </div>
        </a>
      </div>
    `).join('');
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

export const productsDisplay = new ProductsDisplay();
