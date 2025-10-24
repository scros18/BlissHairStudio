// Admin Panel Application
// Note: This file is deprecated - admin panel is now handled by main.ts SPA routing

import { authManager } from './utils/auth';
import { productManager } from './utils/productManager';
import { UI } from './components/ui';

class AdminApp {

  async init(): Promise<void> {
    if (!authManager.isAuthenticated()) {
      this.showLoginScreen();
    } else {
      this.showAdminPanel();
    }
  }

  private showLoginScreen(): void {
    const app = document.getElementById('app');
    if (!app) return;
    
    app.innerHTML = `
      <div class="luxury-auth-page">
        <div class="luxury-auth-container">
          <div class="luxury-auth-card">
            <div class="luxury-auth-header">
              <img src="/logo.webp" alt="BlissHairStudio" class="luxury-auth-logo">
              <h1 class="luxury-auth-title">Welcome Back</h1>
              <p class="luxury-auth-subtitle">Sign in to your BlissHairStudio account</p>
            </div>
            <form id="loginForm" class="luxury-auth-form">
              <div class="luxury-form-group">
                <label class="luxury-form-label">Email Address</label>
                <div class="luxury-input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="luxury-input-icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input type="email" class="luxury-form-input" name="email" placeholder="your@email.com" required autofocus>
                </div>
              </div>
              <div class="luxury-form-group">
                <label class="luxury-form-label">Password</label>
                <div class="luxury-input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="luxury-input-icon">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input type="password" class="luxury-form-input" name="password" placeholder="••••••••" required>
                </div>
              </div>
              <button type="submit" class="luxury-btn luxury-btn-primary">
                <span>Sign In</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
            <div class="luxury-auth-divider">
              <span>or</span>
            </div>
            <a href="/" class="luxury-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Back to Website</span>
            </a>
          </div>
          <div class="luxury-auth-decoration">
            <div class="luxury-decoration-circle luxury-circle-1"></div>
            <div class="luxury-decoration-circle luxury-circle-2"></div>
            <div class="luxury-decoration-circle luxury-circle-3"></div>
          </div>
        </div>
      </div>
    `;
    
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      if (authManager.login(email, password, false)) {
        UI.showNotification('Welcome back! 💝', { type: 'success' });
        this.showAdminPanel();
      } else {
        UI.showNotification('Invalid credentials', { type: 'error' });
      }
    });
  }

  private showAdminPanel(): void {
    const app = document.getElementById('app');
    if (!app) return;
    
    const products = productManager.getAllProducts();
    
    app.innerHTML = `
      <div class="admin-page">
        <div class="admin-container">
          <div class="admin-header">
            <div class="admin-header-top">
              <h1>Admin Panel</h1>
              <div>
                <button class="btn btn-secondary" onclick="window.location.href='/'">
                  View Site
                </button>
                <button class="admin-logout" id="logoutBtn">
                  Logout
                </button>
              </div>
            </div>
            <div class="admin-stats">
              <div class="stat-card">
                <div class="stat-value">${products.length}</div>
                <div class="stat-label">Products</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">0</div>
                <div class="stat-label">Orders</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">£${products.reduce((sum, p) => sum + p.price, 0).toFixed(0)}</div>
                <div class="stat-label">Inventory Value</div>
              </div>
            </div>
          </div>
          
          <div class="admin-actions">
            <h2>Quick Actions</h2>
            <div class="action-buttons">
              <button class="btn btn-primary" id="addProductBtn">
                ➕ Add New Product
              </button>
              <button class="btn btn-secondary" id="refreshBtn">
                🔄 Refresh
              </button>
            </div>
          </div>
          
          <div class="admin-products">
            <h2>Products (${products.length})</h2>
            <div class="admin-product-list" id="productsList"></div>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      authManager.logout();
      UI.showNotification('Logged out successfully', { type: 'info' });
      this.showLoginScreen();
    });
    
    document.getElementById('addProductBtn')?.addEventListener('click', () => {
      this.showProductForm();
    });
    
    document.getElementById('refreshBtn')?.addEventListener('click', () => {
      this.renderProducts();
      UI.showNotification('Products refreshed', { type: 'success' });
    });
    
    this.renderProducts();
  }

  private renderProducts(): void {
    const container = document.getElementById('productsList');
    if (!container) return;
    
    const products = productManager.getAllProducts();
    
    if (products.length === 0) {
      container.innerHTML = `
        <div class="products-empty">
          <p>No products yet. Add your first product!</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = products.map(product => `
      <div class="admin-product-item">
        <div class="admin-product-image" style="background-image: url('${product.image || ''}'); background-size: cover; background-position: center;">
          ${!product.image ? '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white;">📦</div>' : ''}
        </div>
        <div class="admin-product-info">
          <h3 class="admin-product-title">${product.title}</h3>
          <p class="admin-product-description">${product.description}</p>
          <div class="admin-product-meta">
            <span class="admin-product-price">£${product.price.toFixed(2)}</span>
            ${product.badge ? `<span class="badge badge-primary">${product.badge}</span>` : ''}
          </div>
        </div>
        <div class="admin-product-actions">
          <button class="btn btn-primary btn-sm" data-action="edit" data-id="${product.id}">
            Edit
          </button>
          <button class="btn btn-danger btn-sm" data-action="delete" data-id="${product.id}">
            Delete
          </button>
        </div>
      </div>
    `).join('');
    
    // Add event listeners
    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const action = target.dataset.action;
        const id = target.dataset.id;
        
        if (!id) return;
        
        if (action === 'edit') {
          this.showProductForm(id);
        } else if (action === 'delete') {
          this.deleteProduct(id);
        }
      });
    });
  }

  private showProductForm(productId?: string): void {
    const product = productId ? productManager.getProduct(productId) : null;
    
    const form = document.createElement('form');
    form.className = 'product-form';
    form.innerHTML = `
      <div class="form-group">
        <label class="form-label required">Product Title</label>
        <input type="text" class="form-input" name="title" value="${product?.title || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label required">Description</label>
        <textarea class="form-textarea" name="description" required>${product?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label required">Price (£)</label>
        <input type="number" class="form-input" name="price" step="0.01" min="0" value="${product?.price || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Badge (Optional)</label>
        <input type="text" class="form-input" name="badge" value="${product?.badge || ''}" placeholder="e.g., New, Sale, Bestseller">
      </div>
      <div class="form-group">
        <label class="form-label">Product Image</label>
        <div class="file-upload">
          <input type="file" accept="image/*" class="file-upload-input" id="imageInput">
          <label for="imageInput" class="file-upload-label">
            📷 Choose Image
          </label>
        </div>
        ${product?.image ? `<div class="image-preview-container"><img src="${product.image}" class="image-preview"></div>` : ''}
        <span class="form-helper">Upload a product image or leave blank for placeholder</span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
        <button type="submit" class="btn btn-primary">${product ? 'Update' : 'Add'} Product</button>
      </div>
    `;
    
    const modal = UI.showModal(form, `${product ? 'Edit' : 'Add'} Product`);
    
    // Handle image upload
    const imageInput = form.querySelector('#imageInput') as HTMLInputElement;
    imageInput.addEventListener('change', () => {
      const file = imageInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          // Store base64 image
          imageInput.dataset.imageData = result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    form.querySelector('#cancelBtn')?.addEventListener('click', () => {
      modal.remove();
    });
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      
      const productData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        badge: (formData.get('badge') as string) || undefined,
        image: imageInput.dataset.imageData || product?.image
      };
      
      if (productId) {
        productManager.updateProduct(productId, productData);
        UI.showNotification('Product updated successfully! 💝', { type: 'success' });
      } else {
        productManager.addProduct(productData);
        UI.showNotification('Product added successfully! 💝', { type: 'success' });
      }
      
      modal.remove();
      this.renderProducts();
    });
  }

  private deleteProduct(productId: string): void {
    const product = productManager.getProduct(productId);
    if (!product) return;
    
    UI.confirm(
      `Are you sure you want to delete "${product.title}"? This action cannot be undone.`,
      () => {
        if (productManager.deleteProduct(productId)) {
          UI.showNotification('Product deleted successfully', { type: 'success' });
          this.renderProducts();
        } else {
          UI.showNotification('Failed to delete product', { type: 'error' });
        }
      }
    );
  }
}

// Initialize admin app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new AdminApp().init());
} else {
  new AdminApp().init();
}
