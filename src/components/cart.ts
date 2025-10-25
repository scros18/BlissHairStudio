// Cart Component UI

import { cartManager } from '../utils/cartManager';
import { UI } from './ui';
import type { Cart } from '../utils/types';

// Router will be set from outside
let routerInstance: any = null;

export function setCartRouter(router: any): void {
  routerInstance = router;
}

export class CartUI {
  private sidebar: HTMLElement | null = null;
  private overlay: HTMLElement | null = null;
  private cartIcon: HTMLElement | null = null;
  private cartCount: HTMLElement | null = null;

  init(): void {
    this.createCartSidebar();
    this.cartIcon = document.querySelector('.cart-icon');
    this.cartCount = document.querySelector('.cart-count');
    
    if (this.cartIcon) {
      this.cartIcon.addEventListener('click', () => this.toggleCart());
    }
    
    cartManager.subscribe((cart) => this.updateCartUI(cart));
  }

  private createCartSidebar(): void {
    // Create overlay (lighter for dropdown)
    this.overlay = document.createElement('div');
    this.overlay.className = 'cart-overlay';
    this.overlay.style.display = 'none';
    this.overlay.onclick = () => this.closeCart();
    
    // Create dropdown modal
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'cart-dropdown';
    this.sidebar.innerHTML = `
      <div class="cart-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8M12 8v8"/>
        </svg>
        <h3>Your Cart</h3>
      </div>
      <div class="cart-body"></div>
      <div class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span class="cart-total-amount">£0.00</span>
        </div>
        <button class="btn btn-primary btn-checkout" id="checkoutBtn">
          Checkout
        </button>
      </div>
    `;
    
    const closeBtn = this.sidebar.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCart());
    }
    
    const checkoutBtn = this.sidebar.querySelector('#checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.checkout());
    }
    
    // Append overlay to body
    document.body.appendChild(this.overlay);
    
    // Append dropdown to cart icon's parent (nav-actions) to position it properly
    const cartIconParent = document.querySelector('.cart-icon')?.parentElement;
    if (cartIconParent) {
      cartIconParent.style.position = 'relative';
      cartIconParent.appendChild(this.sidebar);
    } else {
      // Fallback to body if cart icon not found yet
      document.body.appendChild(this.sidebar);
    }
  }

  private toggleCart(): void {
    // Close auth dropdown if open
    this.closeAuthDropdown();
    
    if (this.sidebar?.classList.contains('active')) {
      this.closeCart();
    } else {
      this.openCart();
    }
  }
  
  private closeAuthDropdown(): void {
    const authDropdown = document.querySelector('.auth-dropdown');
    const authOverlay = document.querySelector('.auth-dropdown-overlay');
    if (authDropdown) {
      (authDropdown as HTMLElement).style.display = 'none';
      authDropdown.classList.remove('show');
    }
    if (authOverlay) {
      (authOverlay as HTMLElement).style.display = 'none';
      authOverlay.classList.remove('show');
    }
  }

  private openCart(): void {
    this.sidebar?.classList.add('active');
    if (this.overlay) {
      this.overlay.style.display = 'block';
    }
  }

  private closeCart(): void {
    this.sidebar?.classList.remove('active');
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  private updateCartUI(cart: Cart): void {
    // Update cart count
    if (this.cartCount) {
      const count = cartManager.getItemCount();
      this.cartCount.textContent = count.toString();
      this.cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
    
    // Update cart body
    const cartBody = this.sidebar?.querySelector('.cart-body');
    if (!cartBody) return;
    
    if (cart.items.length === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty">
          <p>Your cart is empty</p>
          <p style="font-size: 0.9rem; margin-top: 10px;">Add some products to get started!</p>
        </div>
      `;
    } else {
      cartBody.innerHTML = cart.items.map(item => `
        <div class="cart-item" data-product-id="${item.product.id}">
          <div class="cart-item-image" style="background-image: url('${item.product.image || '/logo.webp'}')"></div>
          <div class="cart-item-info">
            <div class="cart-item-title">${item.product.title}</div>
            <div class="cart-item-price">£${item.product.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn" data-action="decrease">−</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" data-action="increase">+</button>
            </div>
            <button class="cart-item-remove">Remove</button>
          </div>
        </div>
      `).join('');
      
      // Add event listeners
      cartBody.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const action = target.dataset.action;
          const productId = target.closest('.cart-item')?.getAttribute('data-product-id');
          
          if (productId) {
            const item = cart.items.find(i => i.product.id === productId);
            if (item) {
              const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
              cartManager.updateQuantity(productId, newQuantity);
            }
          }
        });
      });
      
      cartBody.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = (e.target as HTMLElement).closest('.cart-item')?.getAttribute('data-product-id');
          if (productId) {
            cartManager.removeItem(productId);
            UI.showNotification('Item removed from cart', { type: 'info' });
          }
        });
      });
    }
    
    // Update total
    const totalAmount = this.sidebar?.querySelector('.cart-total-amount');
    if (totalAmount) {
      totalAmount.textContent = `£${cart.total.toFixed(2)}`;
    }
  }

  private checkout(): void {
    const cart = cartManager.getCart();
    
    if (cart.items.length === 0) {
      UI.showNotification('Your cart is empty!', { type: 'warning' });
      return;
    }
    
    // Close cart and navigate to checkout
    this.closeCart();
    
    // Use the router instance
    if (routerInstance) {
      routerInstance.navigate('/checkout');
    } else {
      // Fallback to window navigation
      window.location.href = '/checkout';
    }
  }
}

export const cartUI = new CartUI();
