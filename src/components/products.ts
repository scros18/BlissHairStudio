// Products Display Component

import { productManager } from '../utils/productManager';
import { cartManager } from '../utils/cartManager';
import { UI } from './ui';

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
        <div class="products-empty">
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
    
    this.container.innerHTML = products.map(product => `
      <article class="product-card" data-product-id="${product.id}">
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <div class="product-image">
          ${product.image 
            ? `<img src="${product.image}" alt="${product.title}" loading="lazy">` 
            : `<div class="product-placeholder">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path d="M2 17L12 22L22 17"/>
                  <path d="M2 12L12 17L22 12"/>
                </svg>
              </div>`
          }
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-details">
            <span class="product-price">£${product.price.toFixed(2)}</span>
            <button class="btn-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    `).join('');
    
    // Add event listeners to all add-to-cart buttons
    this.container.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = (e.target as HTMLElement).dataset.productId;
        if (productId) {
          this.addToCart(productId, e.target as HTMLElement);
        }
      });
    });
  }

  private addToCart(productId: string, button: HTMLElement): void {
    const product = productManager.getProduct(productId);
    if (!product) return;
    
    cartManager.addItem(product, 1);
    
    // Visual feedback
    const originalText = button.textContent;
    button.textContent = 'Added! ✓';
    button.classList.add('btn-success');
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-icon') as HTMLElement;
    if (cartIcon) {
      cartIcon.style.transform = 'scale(1.2)';
      setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
      }, 300);
    }
    
    // Reset button
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('btn-success');
    }, 2000);
    
    UI.showNotification(`${product.title} added to cart!`);
  }
}

export const productsDisplay = new ProductsDisplay();
