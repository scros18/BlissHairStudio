// Main Application Entry Point

import './styles/main.css';
import './styles/pages.css';
import './styles/admin.css';
import './styles/admin-panel.css';
import './styles/performance.css';
import './styles/auth.css';
import { navigation } from './components/navigation';
import { productsDisplay } from './components/products';
import { cartUI } from './components/cart';
import { reviewsDisplay } from './components/reviews';
import { UI } from './components/ui';
import { router } from './utils/router';
import { pageManager } from './utils/pageManager';
import { seoManager } from './utils/seo';
import { homePageTemplate } from './pages/home';
import { productsPageTemplate } from './pages/products';
import { aboutPageTemplate } from './pages/about';
import { servicesPageTemplate } from './pages/services';
import { contactPageTemplate } from './pages/contact';
import { checkoutPageTemplate } from './pages/checkout';
import { accountPageTemplate } from './pages/account';
import { loginPageTemplate } from './pages/login';
import { registerPageTemplate } from './pages/register';
import { adminPanelTemplate } from './pages/admin';
import { authManager } from './utils/authManager';
import { productManager } from './utils/productManager';
import { renderPrivacyPage } from './pages/privacy';
import { renderTermsPage } from './pages/terms';
import { renderAccessibilityPage } from './pages/accessibility';
import { clientsPageTemplate, initClientsGallery } from './pages/clients';
import { storesPage } from './pages/stores';

class App {
  async init(): Promise<void> {
    try {
      // Initialize components
      navigation.init();
      cartUI.init();
      
      // Setup routing
      this.setupRoutes();
      
      // Start router
      router.start();
      
      // Listen for page changes
      window.addEventListener('page-loaded', () => {
        this.onPageLoad();
      });
      
      console.log('%c💝 BlissHairStudio %c✨', 
        'color: #00897B; font-size: 20px; font-weight: bold;',
        'color: #009688; font-size: 16px;'
      );
    } catch (error) {
      console.error('App initialization error:', error);
    }
  }

  private setupRoutes(): void {
    router
      .route('/', () => {
        seoManager.updateMeta(seoManager.getHomeSEO());
        pageManager.loadPageFromTemplate(homePageTemplate);
      })
      .route('/products', () => {
        seoManager.updateMeta(seoManager.getProductsSEO());
        pageManager.loadPageFromTemplate(productsPageTemplate);
        setTimeout(() => {
          productsDisplay.init('productsGrid');
          this.setupProductFilters();
        }, 200);
      })
      .route('/about', () => {
        seoManager.updateMeta(seoManager.getAboutSEO());
        pageManager.loadPageFromTemplate(aboutPageTemplate);
      })
      .route('/services', () => {
        seoManager.updateMeta(seoManager.getServicesSEO());
        pageManager.loadPageFromTemplate(servicesPageTemplate);
      })
      .route('/contact', () => {
        seoManager.updateMeta(seoManager.getContactSEO());
        pageManager.loadPageFromTemplate(contactPageTemplate);
      })
      .route('/checkout', () => {
        seoManager.updateMeta(seoManager.getCheckoutSEO());
        pageManager.loadPageFromTemplate(checkoutPageTemplate);
        setTimeout(() => this.setupCheckout(), 200);
      })
      .route('/account', () => {
        // Check if user is logged in
        if (!authManager.isLoggedIn()) {
          router.navigate('/login');
          return;
        }
        const user = authManager.getCurrentUser();
        const userName = user?.name || 'User';
        const isAdmin = user?.isAdmin || false;
        
        seoManager.updateMeta(seoManager.getAccountSEO());
        pageManager.loadPageFromTemplate(() => accountPageTemplate(userName, isAdmin));
        setTimeout(() => this.setupAccount(), 200);
      })
      .route('/login', () => {
        // Redirect if already logged in
        if (authManager.isLoggedIn()) {
          router.navigate('/account');
          return;
        }
        seoManager.updateMeta({ title: 'Login - BlissHairStudio', description: 'Sign in to your account', keywords: 'login, sign in, account' });
        pageManager.loadPageFromTemplate(loginPageTemplate);
        setTimeout(() => this.setupLogin(), 200);
      })
      .route('/register', () => {
        // Redirect if already logged in
        if (authManager.isLoggedIn()) {
          router.navigate('/account');
          return;
        }
        seoManager.updateMeta({ title: 'Create Account - BlissHairStudio', description: 'Join BlissHairStudio', keywords: 'register, create account, sign up' });
        pageManager.loadPageFromTemplate(registerPageTemplate);
        setTimeout(() => this.setupRegister(), 200);
      })
      .route('/admin', () => {
        // Check if user is admin
        const user = authManager.getCurrentUser();
        if (!user?.isAdmin) {
          router.navigate('/');
          return;
        }
        seoManager.updateMeta({ title: 'Admin Panel - BlissHairStudio', description: 'Admin access', keywords: 'admin, management' });
        this.loadAdminPanel();
      })
      .route('/privacy', () => {
        seoManager.updateMeta({ 
          title: 'Privacy Policy - BlissHairStudio', 
          description: 'Learn how we protect your personal data and privacy', 
          keywords: 'privacy policy, data protection, personal information' 
        });
        pageManager.loadPageFromTemplate(renderPrivacyPage);
      })
      .route('/terms', () => {
        seoManager.updateMeta({ 
          title: 'Terms of Service - BlissHairStudio', 
          description: 'Terms and conditions for using our services', 
          keywords: 'terms of service, terms and conditions, legal' 
        });
        pageManager.loadPageFromTemplate(renderTermsPage);
      })
      .route('/accessibility', () => {
        seoManager.updateMeta({ 
          title: 'Accessibility Statement - BlissHairStudio', 
          description: 'Our commitment to web accessibility and inclusive design', 
          keywords: 'accessibility, WCAG, inclusive design, web accessibility' 
        });
        pageManager.loadPageFromTemplate(renderAccessibilityPage);
      })
      .route('/clients', () => {
        seoManager.updateMeta({
          title: 'Client Gallery - Hair Transformations | BlissHairStudio',
          description: 'Browse our stunning gallery of real client hair transformations. See the beautiful work we create at BlissHairStudio - balayage, cuts, colors & more.',
          keywords: 'hair gallery, client transformations, hair before after, salon portfolio, hair inspiration, BlissHairStudio gallery'
        });
        pageManager.loadPageFromTemplate(clientsPageTemplate);
        setTimeout(() => initClientsGallery(), 100);
      })
      .route('/stores', () => {
        seoManager.updateMeta({
          title: 'Store Locator - Find Your Nearest Bliss Hair Studio',
          description: 'Find your nearest Bliss Hair Studio location. Browse our salons across the UK and book an appointment today.',
          keywords: 'hair salon locations, store locator, find salon, BlissHairStudio near me, salon addresses'
        });
        pageManager.loadPageFromTemplate(storesPage);
      })
      .notFound(() => {
        router.navigate('/');
      });
  }

  private onPageLoad(): void {
    this.setupScrollAnimations();
    this.setupForms();
    
    // Initialize reviews display if on home page
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (reviewsGrid) {
      reviewsDisplay.init('reviewsGrid');
    }
  }

  private setupScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add('fade-in-up');
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.feature, .product-card, .service-card, .testimonial-card').forEach(el => {
      observer.observe(el);
    });
  }

  private setupForms(): void {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm as HTMLFormElement);
        
        console.log('Contact form submitted:', {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message')
        });
        
        UI.showNotification('Thank you! We\'ll get back to you soon! 💝', { type: 'success' });
        (contactForm as HTMLFormElement).reset();
      });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(newsletterForm as HTMLFormElement);
        
        console.log('Newsletter subscription:', {
          email: formData.get('email')
        });
        
        UI.showNotification('Successfully subscribed to our newsletter! 🎉', { type: 'success' });
        (newsletterForm as HTMLFormElement).reset();
      });
    }
  }

  private setupCheckout(): void {
    // Checkout step navigation    
    const updateStep = (step: number) => {
      document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.form-section').forEach(el => el.classList.add('hidden'));
      
      document.querySelector(`.step[data-step="${step}"]`)?.classList.add('active');
      document.querySelector(`.form-section[data-section="${step}"]`)?.classList.remove('hidden');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    document.getElementById('continueToPayment')?.addEventListener('click', () => updateStep(2));
    document.getElementById('continueToReview')?.addEventListener('click', () => updateStep(3));
    document.getElementById('backToShipping')?.addEventListener('click', () => updateStep(1));
    document.getElementById('backToPayment')?.addEventListener('click', () => updateStep(2));
    
    // Checkout form submission
    const form = document.getElementById('checkoutForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      UI.showNotification('Order placed successfully! 🎉', { type: 'success' });
      setTimeout(() => router.navigate('/account'), 1500);
    });
    
    // Load cart items into checkout
    this.loadCheckoutItems();
  }
  
  private setupLogin(): void {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const result = authManager.login(email, password);
      
      if (result.success) {
        this.showAuthMessage('success', result.message);
        setTimeout(() => {
          router.navigate('/account');
        }, 1000);
      } else {
        this.showAuthMessage('error', result.message);
      }
    });
  }

  private setupRegister(): void {
    const form = document.getElementById('registerForm');
    if (!form) return;

    // Password strength indicator
    const passwordInput = document.getElementById('registerPassword') as HTMLInputElement;
    const strengthIndicator = document.getElementById('passwordStrength');
    
    passwordInput?.addEventListener('input', () => {
      const password = passwordInput.value;
      if (strengthIndicator) {
        strengthIndicator.classList.add('active');
        strengthIndicator.classList.remove('weak', 'medium', 'strong');
        
        if (password.length < 6) {
          strengthIndicator.classList.add('weak');
        } else if (password.length < 10) {
          strengthIndicator.classList.add('medium');
        } else {
          strengthIndicator.classList.add('strong');
        }
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form as HTMLFormElement);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      // Validate passwords match
      if (password !== confirmPassword) {
        this.showAuthMessage('error', 'Passwords do not match');
        return;
      }

      const result = authManager.register(email, password, name, phone);
      
      if (result.success) {
        this.showAuthMessage('success', result.message + ' Redirecting to login...');
        setTimeout(() => {
          router.navigate('/login');
        }, 1500);
      } else {
        this.showAuthMessage('error', result.message);
      }
    });
  }

  private showAuthMessage(type: 'success' | 'error', message: string): void {
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const authForm = document.querySelector('.auth-form');
    if (!authForm) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;
    authForm.insertBefore(messageDiv, authForm.firstChild);

    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  private setupAccount(): void {
    const user = authManager.getCurrentUser();
    if (!user) {
      router.navigate('/login');
      return;
    }

    // Populate profile form with user data
    const profileName = document.getElementById('profileName') as HTMLInputElement;
    const profileEmail = document.getElementById('profileEmail') as HTMLInputElement;
    const profilePhone = document.getElementById('profilePhone') as HTMLInputElement;
    
    if (profileName) profileName.value = user.name || '';
    if (profileEmail) profileEmail.value = user.email || '';
    if (profilePhone) profilePhone.value = user.phone || '';

    // Display user orders
    this.loadUserOrders();
    
    // Tab switching
    document.querySelectorAll('.account-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tab = (item as HTMLElement).dataset.tab;
        
        document.querySelectorAll('.account-nav-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.account-tab').forEach(el => el.classList.remove('active'));
        
        item.classList.add('active');
        document.querySelector(`.account-tab[data-tab-content="${tab}"]`)?.classList.add('active');
        
        // Load data for specific tabs
        if (tab === 'orders') {
          this.loadUserOrders();
        } else if (tab === 'addresses') {
          this.loadUserAddresses();
        }
      });
    });
    
    // Logout button
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      authManager.logout();
      UI.showNotification('Logged out successfully! See you soon! 👋', { type: 'info' });
      setTimeout(() => {
        router.navigate('/');
      }, 800);
    });
    
    // Profile form submission
    document.getElementById('profileForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const updates = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string
      };
      
      const result = authManager.updateProfile(updates);
      if (result.success) {
        UI.showNotification('✨ Profile updated successfully!', { type: 'success' });
        // Refresh the page content with updated name
        const updatedUser = authManager.getCurrentUser();
        if (updatedUser) {
          const welcomeText = document.querySelector('.account-header-content h1');
          if (welcomeText) {
            const firstName = updatedUser.name ? updatedUser.name.split(' ')[0] : 'User';
            welcomeText.textContent = `Welcome back, ${firstName}! ✨`;
          }
        }
      } else {
        UI.showNotification(result.message, { type: 'error' });
      }
    });
    
    // Password change form
    document.getElementById('passwordForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const currentPassword = formData.get('currentPassword') as string;
      const newPassword = formData.get('newPassword') as string;
      const confirmPassword = formData.get('confirmPassword') as string;
      
      if (!currentPassword || !newPassword || !confirmPassword) {
        UI.showNotification('Please fill in all fields', { type: 'error' });
        return;
      }
      
      if (newPassword !== confirmPassword) {
        UI.showNotification('New passwords do not match', { type: 'error' });
        return;
      }
      
      if (newPassword.length < 6) {
        UI.showNotification('Password must be at least 6 characters', { type: 'error' });
        return;
      }
      
      // In production, this would verify current password and update
      UI.showNotification('🔐 Password updated successfully!', { type: 'success' });
      (e.target as HTMLFormElement).reset();
    });
    
    // Settings toggles
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        const setting = (e.target as HTMLInputElement).closest('.setting-item')?.querySelector('h3')?.textContent;
        UI.showNotification(`${setting} ${isChecked ? 'enabled' : 'disabled'}`, { type: 'info' });
      });
    });
    
    // Delete account button
    document.querySelector('.danger-actions .btn-danger')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        authManager.logout();
        UI.showNotification('Account deleted successfully', { type: 'info' });
        setTimeout(() => router.navigate('/'), 1000);
      }
    });
  }

  private loadUserOrders(): void {
    const user = authManager.getCurrentUser();
    const ordersList = document.getElementById('ordersList');
    if (!ordersList || !user) return;

    if (user.orders && user.orders.length > 0) {
      ordersList.innerHTML = user.orders.map(order => `
        <div class="order-card">
          <div class="order-card-header">
            <div>
              <h3>Order #${order.id}</h3>
              <p class="order-date">Placed on ${new Date(order.date).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</p>
            </div>
            <span class="order-status-badge ${order.status}">${order.status}</span>
          </div>
          <div class="order-items-preview">
            ${order.items.map(item => `
              <div class="order-item-mini">
                <div class="order-item-image"></div>
                <div class="order-item-info">
                  <p class="order-item-name">${item.name}</p>
                  <p class="order-item-qty">Qty: ${item.quantity}</p>
                </div>
                <p class="order-item-price">£${item.price.toFixed(2)}</p>
              </div>
            `).join('')}
          </div>
          <div class="order-card-footer">
            <div class="order-total">Total: <strong>£${order.total.toFixed(2)}</strong></div>
            <div class="order-actions">
              <button class="btn btn-secondary btn-sm">View Details</button>
              <button class="btn btn-primary btn-sm">Reorder</button>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      ordersList.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <h3>No orders yet</h3>
          <p>Start shopping to see your orders here</p>
          <a href="/products" class="btn btn-primary">Shop Now</a>
        </div>
      `;
    }
  }

  private loadUserAddresses(): void {
    const user = authManager.getCurrentUser();
    const addressesGrid = document.querySelector('.addresses-grid');
    if (!addressesGrid || !user) return;

    const existingAddresses = user.addresses && user.addresses.length > 0 ? user.addresses.map(address => `
      <div class="address-card">
        <div class="address-card-header">
          <h3>${address.name}</h3>
          ${address.isDefault ? '<span class="address-default-badge">Default</span>' : ''}
        </div>
        <p class="address-details">
          ${address.street}<br>
          ${address.city}, ${address.postalCode}<br>
          ${address.country}
        </p>
        <div class="address-actions">
          <button class="btn btn-secondary btn-sm" onclick="editAddress('${address.id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteAddress('${address.id}')">Delete</button>
        </div>
      </div>
    `).join('') : '';

    addressesGrid.innerHTML = existingAddresses + `
      <button class="address-card add-address" id="addAddressBtn">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        <span>Add New Address</span>
      </button>
    `;

    // Add address button handler
    document.getElementById('addAddressBtn')?.addEventListener('click', () => {
      UI.showNotification('Address management coming soon!', { type: 'info' });
    });
  }

  private loadAdminPanel(): void {
    pageManager.loadPageFromTemplate(adminPanelTemplate);
    setTimeout(() => this.setupAdminPanel(), 200);
  }

  private setupAdminPanel(): void {
    // Section navigation
    document.querySelectorAll('.admin-nav-item[data-section]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = (item as HTMLElement).dataset.section;
        
        document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.admin-section').forEach(el => el.classList.remove('active'));
        
        item.classList.add('active');
        document.querySelector(`.admin-section[data-section-content="${section}"]`)?.classList.add('active');
      });
    });

    // Load products
    this.loadProductsTable();

    // Add Product Modal
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm') as HTMLFormElement;
    
    document.getElementById('addProductBtn')?.addEventListener('click', () => {
      productForm?.reset();
      document.getElementById('productId')!.setAttribute('value', '');
      document.getElementById('productModalTitle')!.textContent = 'Add Product';
      productModal?.classList.add('active');
    });

    document.getElementById('closeProductModal')?.addEventListener('click', () => {
      productModal?.classList.remove('active');
    });

    document.getElementById('cancelProductBtn')?.addEventListener('click', () => {
      productModal?.classList.remove('active');
    });

    productForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(productForm);
      const productId = formData.get('id') as string;
      
      const productData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        badge: formData.get('badge') as string || undefined
      };

      if (productId) {
        // Update existing product
        productManager.updateProduct(productId, productData);
        UI.showNotification('✨ Product updated successfully!', { type: 'success' });
      } else {
        // Add new product
        productManager.addProduct(productData);
        UI.showNotification('✨ Product added successfully!', { type: 'success' });
      }

      productModal?.classList.remove('active');
      this.loadProductsTable();
      productsDisplay.init(); // Refresh products page
    });

    // Categories functionality would go here
    // For simplicity, not implementing full category CRUD in this iteration
  }

  private loadProductsTable(): void {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    const products = productManager.getAllProducts();
    
    if (products.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; padding: 40px; color: #94A3B8;">
            No products yet. Click "Add Product" to get started!
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = products.map(product => `
      <tr>
        <td>
          <div class="product-info">
            <div class="product-name">${product.title}</div>
            <div class="product-description">${product.description}</div>
          </div>
        </td>
        <td><div class="product-price">£${product.price.toFixed(2)}</div></td>
        <td>${product.badge ? `<span class="product-badge">${product.badge}</span>` : '—'}</td>
        <td>
          <div class="product-actions">
            <button class="btn-icon" onclick="window.editProduct('${product.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="btn-icon danger" onclick="window.deleteProduct('${product.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Add global functions for edit/delete
    (window as any).editProduct = (id: string) => {
      const product = productManager.getProduct(id);
      if (!product) return;

      (document.getElementById('productId') as HTMLInputElement).value = id;
      (document.getElementById('productTitle') as HTMLInputElement).value = product.title;
      (document.getElementById('productDescription') as HTMLTextAreaElement).value = product.description;
      (document.getElementById('productPrice') as HTMLInputElement).value = product.price.toString();
      (document.getElementById('productBadge') as HTMLInputElement).value = product.badge || '';
      
      document.getElementById('productModalTitle')!.textContent = 'Edit Product';
      document.getElementById('productModal')?.classList.add('active');
    };

    (window as any).deleteProduct = (id: string) => {
      if (confirm('Are you sure you want to delete this product?')) {
        productManager.deleteProduct(id);
        UI.showNotification('Product deleted successfully', { type: 'info' });
        this.loadProductsTable();
        productsDisplay.init(); // Refresh products page
      }
    };
  }
  
  private loadCheckoutItems(): void {
    // This would load actual cart items - for now showing placeholder
    const container = document.getElementById('checkoutOrderItems');
    if (!container) return;
    
    container.innerHTML = `
      <div class="order-item-summary">
        <div class="order-item-image"></div>
        <div class="order-item-details">
          <h4>Sample Product</h4>
          <p>Qty: 1</p>
        </div>
        <div class="order-item-price">£49.99</div>
      </div>
    `;
    
    // Update totals
    document.getElementById('orderSubtotal')!.textContent = '£49.99';
    document.getElementById('orderTotal')!.textContent = '£54.99';
  }

  private setupProductFilters(): void {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = (button as HTMLElement).dataset.filter;
        console.log('Filter selected:', filter);
        
        // Note: Actual filtering logic would go here
        // For now, all products are shown since we don't have categories implemented yet
      });
    });
  }

}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App().init());
} else {
  new App().init();
}

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silently fail if SW registration fails
    });
  });
}
