// Main Application Entry Point

import './styles/main.css';
import './styles/pages.css';
import './styles/admin.css';
import './styles/admin-panel.css';
import './styles/performance.css';
import './styles/auth.css';
import './styles/luxury-products.css';
import './styles/checkout.css';
import { navigation } from './components/navigation';
import { productsDisplay } from './components/products';
import { cartUI, setCartRouter } from './components/cart';
import { reviewsDisplay } from './components/reviews';
import { UI } from './components/ui';
import { router } from './utils/router';
import { pageManager } from './utils/pageManager';
import { seoManager } from './utils/seo';
import { homePageTemplate, initProductCarousel, initProductDetailGallery, initProductDetailInteractions } from './pages/home';
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
// Using API-backed managers for persistent JSON storage
import { productManagerAPI as productManager } from './utils/productManagerAPI';
import { categoryManager } from './utils/categoryManager';
import { renderPrivacyPage } from './pages/privacy';
import { renderTermsPage } from './pages/terms';
import { renderAccessibilityPage } from './pages/accessibility';
import { clientsPageTemplate, initClientsGallery } from './pages/clients';
import { storesPage } from './pages/stores';
import { productMoistureTemplate } from './pages/product-moisture';
import { productProteinTemplate } from './pages/product-protein';
import { productDuoTemplate } from './pages/product-duo';
import { dynamicProductTemplate } from './pages/product-dynamic';
import { cartManager } from './utils/cartManager';
// Using API-backed managers for persistent JSON storage
import { orderManagerAPI as orderManager } from './utils/orderManagerAPI';
import { userProfileManager } from './utils/userProfileManager';

class App {
  async init(): Promise<void> {
    try {
      // Initialize components
      navigation.init();
      cartUI.init();
      
      // Set router for cart component
      setCartRouter(router);
      
      // Setup cart event listener for product pages
      this.setupCartEvents();
      
  // Setup routing
      this.setupRoutes();
      
  // Ensure products are loaded before first route handling (prevents 404/redirect on refresh)
  await productManager.waitForInit();
      
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

  private setupCartEvents(): void {
    // Listen for addToCart events from product pages
    window.addEventListener('addToCart', ((event: CustomEvent) => {
      const { id, title, price, image, size, description, quantity } = event.detail;
      
      const product = {
        id,
        title,
        price,
        image,
        size,
        description,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      // Add to cart
      for (let i = 0; i < quantity; i++) {
        cartManager.addItem(product);
      }
      
      // Show success notification
      UI.showNotification(`✨ Added ${quantity} x ${title} to cart!`, { type: 'success' });
    }) as EventListener);
  }

  private setupRoutes(): void {
    router
      .route('/', () => {
        seoManager.updateMeta(seoManager.getHomeSEO());
        pageManager.loadPageFromTemplate(homePageTemplate);
        // Defer init until content is in DOM
        requestAnimationFrame(() => setTimeout(() => initProductCarousel(), 0));
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
      .route('/clients', async () => {
        seoManager.updateMeta({
          title: 'Client Gallery - Hair Transformations | BlissHairStudio',
          description: 'Browse our stunning gallery of real client hair transformations. See the beautiful work we create at BlissHairStudio - balayage, cuts, colors & more.',
          keywords: 'hair gallery, client transformations, hair before after, salon portfolio, hair inspiration, BlissHairStudio gallery'
        });
        pageManager.loadPageFromTemplate(clientsPageTemplate);
        setTimeout(async () => await initClientsGallery(), 100);
      })
      .route('/stores', () => {
        seoManager.updateMeta({
          title: 'Store Locator - Find Your Nearest Bliss Hair Studio',
          description: 'Find your nearest Bliss Hair Studio location. Browse our salons across the UK and book an appointment today.',
          keywords: 'hair salon locations, store locator, find salon, BlissHairStudio near me, salon addresses'
        });
        pageManager.loadPageFromTemplate(storesPage);
      })
      .route('/product/:slug', async () => {
        // Dynamic product route - extract slug from URL
        const pathParts = window.location.pathname.split('/');
        const slug = pathParts[pathParts.length - 1];
        
        // Ensure products are ready
        await productManager.waitForInit();
        
        // Find product by slug
  const products = productManager.getAllProducts();
        const product = products.find((p) => {
          const productSlug = (p.slug ?? p.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''));
          return productSlug === slug;
        });
        
        if (!product) {
          // Product not found, redirect to products page
          router.navigate('/products');
          return;
        }
        
        seoManager.updateMeta({
          title: `${product.title} | BlissHairStudio`,
          description: product.description || `${product.title} - Premium hair care product available at BlissHairStudio.`,
          keywords: `${product.title}, hair product, salon product, hair care`
        });
        
        pageManager.loadPageFromTemplate(() => dynamicProductTemplate(product));
        
        // Wait for DOM to be ready before initializing interactions
        setTimeout(() => {
          const checkAndInit = () => {
            const root = document.querySelector('.luxury-product-detail-page');
            if (root) {
              initProductDetailGallery();
              initProductDetailInteractions({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image || '/logo.webp',
                defaultSize: '325ml'
              });
            } else {
              setTimeout(checkAndInit, 50);
            }
          };
          checkAndInit();
        }, 100);
      })
  .route('/product/moisture-senses', () => {
        seoManager.updateMeta({
          title: 'Moisture Senses Hydrating Conditioner | BlissHairStudio',
          description: 'Davroe Moisture Senses Hydrating Conditioner - Deeply nourish and hydrate dry, damaged hair with this luxurious salon treatment.',
          keywords: 'hydrating conditioner, moisture conditioner, hair conditioner, Davroe products'
        });
        pageManager.loadPageFromTemplate(productMoistureTemplate);
        
        setTimeout(() => {
          const checkAndInit = () => {
            const root = document.querySelector('.luxury-product-detail-page');
            if (root) {
              initProductDetailGallery();
              initProductDetailInteractions({
                id: 'product-moisture-senses',
                title: 'Moisture Senses Hydrating Conditioner',
                price: 29.95,
                image: '/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg',
                defaultSize: '325ml'
              });
            } else {
              setTimeout(checkAndInit, 50);
            }
          };
          checkAndInit();
        }, 100);
      })
      .route('/product/protein-rebuilder', () => {
        seoManager.updateMeta({
          title: 'Protein Hair Rebuilder | BlissHairStudio',
          description: 'Davroe Protein Hair Rebuilder - Intensive reparative treatment that reconstructs and strengthens damaged hair from within.',
          keywords: 'protein treatment, hair rebuilder, damaged hair treatment, Davroe protein'
        });
        pageManager.loadPageFromTemplate(productProteinTemplate);
        
        setTimeout(() => {
          const checkAndInit = () => {
            const root = document.querySelector('.luxury-product-detail-page');
            if (root) {
              initProductDetailGallery();
              initProductDetailInteractions({
                id: 'product-protein-rebuilder',
                title: 'Protein Hair Rebuilder',
                price: 39.95,
                image: '/Davroe_Protein_Hair_Rebuilder_200ml__77435.jpg',
                defaultSize: '200ml'
              });
            } else {
              setTimeout(checkAndInit, 50);
            }
          };
          checkAndInit();
        }, 100);
      })
      .route('/product/shine-duo', () => {
        seoManager.updateMeta({
          title: 'Shine Fluid & Thermaprotect Duo | BlissHairStudio',
          description: 'The ultimate styling duo - Davroe Shine Fluid and Thermaprotect for gorgeous, protected hair with brilliant shine.',
          keywords: 'shine fluid, heat protection, styling products, Davroe duo, thermaprotect'
        });
        pageManager.loadPageFromTemplate(productDuoTemplate);
        
        setTimeout(() => {
          const checkAndInit = () => {
            const root = document.querySelector('.luxury-product-detail-page');
            if (root) {
              initProductDetailGallery();
              initProductDetailInteractions({
                id: 'product-shine-duo',
                title: 'Shine Fluid & Thermaprotect Duo',
                price: 34.95,
                image: '/Davroe_Thermaprotect_200ml__47285.jpg'
              });
            } else {
              setTimeout(checkAndInit, 50);
            }
          };
          checkAndInit();
        }, 100);
      })
      .notFound(() => {
        router.navigate('/');
      });
  }

  private onPageLoad(): void {
    this.setupScrollAnimations();
    this.setupForms();
    
    // Initialize home product card carousel if present
    if (document.querySelector('.product-image-dots')) {
      initProductCarousel();
    }
    
    // Initialize product detail gallery if present
    if (document.querySelector('.product-detail-images')) {
      initProductDetailGallery();
    }
    
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
    // Redirect if cart is empty
    const cart = cartManager.getCart();
    if (cart.items.length === 0) {
      UI.showNotification('Your cart is empty!', { type: 'warning' });
      setTimeout(() => router.navigate('/products'), 1500);
      return;
    }
    
    // Checkout step navigation    
    const updateStep = (step: number) => {
      document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.form-section').forEach(el => el.classList.add('hidden'));
      
      document.querySelector(`.step[data-step="${step}"]`)?.classList.add('active');
      document.querySelector(`.form-section[data-section="${step}"]`)?.classList.remove('hidden');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Payment method toggle
    const cardDetails = document.getElementById('cardDetails');
    const paypalDetails = document.getElementById('paypalDetails');
    const paymentRadios = document.querySelectorAll<HTMLInputElement>('input[name="paymentMethod"]');
    
    paymentRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value === 'card') {
          cardDetails?.classList.remove('hidden');
          paypalDetails?.classList.add('hidden');
          // Set card inputs as required
          const cardInputs = cardDetails?.querySelectorAll('input');
          cardInputs?.forEach(input => input.setAttribute('required', 'true'));
          const paypalInputs = paypalDetails?.querySelectorAll('input');
          paypalInputs?.forEach(input => input.removeAttribute('required'));
        } else if (target.value === 'paypal') {
          cardDetails?.classList.add('hidden');
          paypalDetails?.classList.remove('hidden');
          // Remove required from card inputs
          const cardInputs = cardDetails?.querySelectorAll('input');
          cardInputs?.forEach(input => input.removeAttribute('required'));
        }
      });
    });
    
    // Card number formatting and validation
    const cardNumberInput = document.getElementById('cardNumberInput') as HTMLInputElement;
    cardNumberInput?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      let value = target.value.replace(/\s/g, '').replace(/\D/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      target.value = formattedValue;
      
      // Detect card brand
      const cardBrandIcon = document.getElementById('cardBrandIcon');
      if (cardBrandIcon && value.length >= 2) {
        const firstDigit = value[0];
        const firstTwo = value.substring(0, 2);
        
        if (firstDigit === '4') {
          cardBrandIcon.innerHTML = '<svg width="40" height="25" viewBox="0 0 48 32"><rect width="48" height="32" rx="4" fill="#1434CB"/><text x="24" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">VISA</text></svg>';
        } else if (firstTwo >= '51' && firstTwo <= '55') {
          cardBrandIcon.innerHTML = '<svg width="40" height="25" viewBox="0 0 48 32"><rect width="48" height="32" rx="4" fill="#EB001B"/><circle cx="18" cy="16" r="8" fill="#EB001B" opacity="0.8"/><circle cx="30" cy="16" r="8" fill="#FF5F00" opacity="0.8"/></svg>';
        } else if (firstTwo === '34' || firstTwo === '37') {
          cardBrandIcon.innerHTML = '<svg width="40" height="25" viewBox="0 0 48 32"><rect width="48" height="32" rx="4" fill="#006FCF"/><text x="24" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold">AMEX</text></svg>';
        } else {
          cardBrandIcon.innerHTML = '';
        }
      }
    });
    
    // Expiry date formatting
    const cardExpiryInput = document.getElementById('cardExpiryInput') as HTMLInputElement;
    cardExpiryInput?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      let value = target.value.replace(/\s/g, '').replace(/\//g, '').replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
      }
      target.value = value;
    });
    
    // CVV input restriction
    const cardCvvInput = document.getElementById('cardCvvInput') as HTMLInputElement;
    cardCvvInput?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/\D/g, '');
    });
    
    // Step 1 -> Step 2: Validate shipping information
    document.getElementById('continueToPayment')?.addEventListener('click', () => {
      const form = document.getElementById('checkoutForm') as HTMLFormElement;
      const section1Inputs = form.querySelectorAll('[data-section="1"] input[required]') as NodeListOf<HTMLInputElement>;
      let isValid = true;
      let firstInvalidInput: HTMLInputElement | null = null;
      
      section1Inputs.forEach(input => {
        const inputEl = input as HTMLInputElement;
        if (!inputEl.value.trim()) {
          isValid = false;
          inputEl.classList.add('error');
          if (!firstInvalidInput) firstInvalidInput = inputEl;
          
          // Remove error class on input
          inputEl.addEventListener('input', () => {
            inputEl.classList.remove('error');
          }, { once: true });
        } else {
          inputEl.classList.remove('error');
        }
      });
      
      // Email validation
      const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('error');
        if (!firstInvalidInput) firstInvalidInput = emailInput;
        UI.showNotification('Please enter a valid email address', { type: 'error' });
      }
      
      if (isValid) {
        updateStep(2);
      } else {
        UI.showNotification('Please fill in all required fields', { type: 'error' });
        firstInvalidInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidInput?.focus();
      }
    });
    
    // Step 2 -> Step 3: Validate payment information
    document.getElementById('continueToReview')?.addEventListener('click', () => {
      const selectedPayment = document.querySelector<HTMLInputElement>('input[name="paymentMethod"]:checked')?.value;
      
      if (selectedPayment === 'card') {
        // Validate card details
        const cardNumber = (document.querySelector('[name="cardNumber"]') as HTMLInputElement)?.value.replace(/\s/g, '');
        const cardExpiry = (document.querySelector('[name="cardExpiry"]') as HTMLInputElement)?.value.replace(/\s|\//g, '');
        const cardCvv = (document.querySelector('[name="cardCvv"]') as HTMLInputElement)?.value;
        const cardName = (document.querySelector('[name="cardName"]') as HTMLInputElement)?.value;
        
        let isValid = true;
        
        if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
          UI.showNotification('Please enter a valid card number', { type: 'error' });
          isValid = false;
        } else if (!cardExpiry || cardExpiry.length !== 4) {
          UI.showNotification('Please enter a valid expiry date (MM/YY)', { type: 'error' });
          isValid = false;
        } else if (!cardCvv || cardCvv.length < 3) {
          UI.showNotification('Please enter a valid CVV', { type: 'error' });
          isValid = false;
        } else if (!cardName || cardName.trim().length < 3) {
          UI.showNotification('Please enter the cardholder name', { type: 'error' });
          isValid = false;
        }
        
        // Validate expiry date
        if (isValid && cardExpiry) {
          const month = parseInt(cardExpiry.substring(0, 2));
          const year = parseInt('20' + cardExpiry.substring(2, 4));
          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = now.getMonth() + 1;
          
          if (month < 1 || month > 12) {
            UI.showNotification('Invalid expiry month', { type: 'error' });
            isValid = false;
          } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
            UI.showNotification('Card has expired', { type: 'error' });
            isValid = false;
          }
        }
        
        if (!isValid) return;
      }
      
      updateStep(3);
      this.displayOrderReview();
    });
    
    document.getElementById('backToShipping')?.addEventListener('click', () => updateStep(1));
    document.getElementById('backToPayment')?.addEventListener('click', () => updateStep(2));
    
    // Checkout form submission
    const form = document.getElementById('checkoutForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const placeOrderBtn = document.getElementById('placeOrderBtn') as HTMLButtonElement;
      if (placeOrderBtn) {
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" class="spinner-path"/>
          </svg>
          Processing...
        `;
      }
      
      // Get form data
      const formData = new FormData(form as HTMLFormElement);
      const shippingAddress = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        postcode: formData.get('postcode') as string,
        notes: formData.get('notes') as string || undefined
      };

      const paymentMethod = formData.get('paymentMethod') as 'card' | 'paypal';
      const paymentDetails = {
        method: paymentMethod,
        cardLast4: paymentMethod === 'card' ? (formData.get('cardNumber') as string)?.slice(-4) : undefined,
        cardBrand: paymentMethod === 'card' ? 'Visa' : undefined // Detect from card number in production
      };
      
      // Simulate payment processing
      setTimeout(async () => {
        try {
          // Get current user
          const user = authManager.getCurrentUser();
          const userEmail = user?.email || shippingAddress.email;
          
          // Create order using API manager (saves to data/orders.json)
          const order = await orderManager.createOrder(
            cart.items,
            shippingAddress,
            paymentDetails,
            userEmail
          );
          
          // Add order to user profile
          if (user) {
            userProfileManager.addOrderToProfile(userEmail, order.id);
          }
          
          // Clear cart
          cartManager.clearCart();
          
          // Show success message
          UI.showNotification(`✨ Order #${order.orderNumber} placed successfully! Check your email for confirmation.`, { type: 'success', duration: 5000 });
          
          // Redirect to account or home
          setTimeout(() => {
            if (user) {
              router.navigate('/account');
            } else {
              router.navigate('/');
            }
          }, 2000);
        } catch (error) {
          console.error('Order creation failed:', error);
          UI.showNotification('❌ Failed to create order. Please try again.', { type: 'error', duration: 5000 });
        }
      }, 2000);
    });
  }
  
  private displayOrderReview(): void {
    const reviewContainer = document.getElementById('orderReview');
    if (!reviewContainer) return;
    
    const items = cartManager.getItems();
    const subtotal = cartManager.getTotal();
    const shipping = subtotal >= 50 ? 0 : 5.00;
    const total = subtotal + shipping;
    
    const shippingInfo = {
      firstName: (document.querySelector('[name="firstName"]') as HTMLInputElement)?.value || '',
      lastName: (document.querySelector('[name="lastName"]') as HTMLInputElement)?.value || '',
      email: (document.querySelector('[name="email"]') as HTMLInputElement)?.value || '',
      phone: (document.querySelector('[name="phone"]') as HTMLInputElement)?.value || '',
      address: (document.querySelector('[name="address"]') as HTMLInputElement)?.value || '',
      city: (document.querySelector('[name="city"]') as HTMLInputElement)?.value || '',
      postcode: (document.querySelector('[name="postcode"]') as HTMLInputElement)?.value || '',
    };
    
    const paymentMethod = document.querySelector<HTMLInputElement>('input[name="paymentMethod"]:checked')?.value || 'card';
    const paymentDisplay = paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal';
    
    reviewContainer.innerHTML = `
      <div class="review-section">
        <h3>Shipping Address</h3>
        <p>${shippingInfo.firstName} ${shippingInfo.lastName}</p>
        <p>${shippingInfo.address}</p>
        <p>${shippingInfo.city}, ${shippingInfo.postcode}</p>
        <p>${shippingInfo.email}</p>
        <p>${shippingInfo.phone}</p>
      </div>
      
      <div class="review-section">
        <h3>Payment Method</h3>
        <p>${paymentDisplay}</p>
      </div>
      
      <div class="review-section">
        <h3>Order Items</h3>
        <div class="review-items">
          ${items.map(item => `
            <div class="review-item">
              <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
              <div style="flex: 1;">
                <p style="font-weight: 600; margin: 0;">${item.title}</p>
                <p style="color: #6B7280; margin: 4px 0 0 0; font-size: 0.875rem;">Quantity: 1</p>
              </div>
              <p style="font-weight: 600;">£${item.price.toFixed(2)}</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="review-totals">
        <div class="review-total-row">
          <span>Subtotal</span>
          <span>£${subtotal.toFixed(2)}</span>
        </div>
        <div class="review-total-row">
          <span>Shipping</span>
          <span>£${shipping.toFixed(2)}</span>
        </div>
        <div class="review-total-row total">
          <strong>Total</strong>
          <strong>£${total.toFixed(2)}</strong>
        </div>
      </div>
    `;
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
    
    // Load and apply user settings
    this.loadUserSettings();
    
    // Settings toggles
    const settingsToggles = document.querySelectorAll('.settings-list .toggle-switch input');
    settingsToggles.forEach((toggle, index) => {
      toggle.addEventListener('change', (e) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        const settingItem = (e.target as HTMLInputElement).closest('.setting-item');
        const settingName = settingItem?.querySelector('h3')?.textContent || '';
        
        // Map setting names to keys
        const settingKey = index === 0 ? 'emailNotifications' : 
                          index === 1 ? 'smsNotifications' : 
                          'marketingEmails';
        
        // Save setting
        userProfileManager.updateSettings(user.email, {
          [settingKey]: isChecked
        });
        
        UI.showNotification(`${settingName} ${isChecked ? 'enabled' : 'disabled'}`, { type: 'info' });
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

    // Get orders using API manager (from data/orders.json)
    const orders = orderManager.getUserOrders(user.email);

    if (orders.length === 0) {
      ordersList.innerHTML = `
        <div class="empty-state">
          <h3>No Orders</h3>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
      `;
      return;
    }

    // Render orders using the new design
    ordersList.innerHTML = orders.map((order: any) => `
      <div class="order-card">
        <div class="order-header">
          <div class="order-info">
            <h4>Order #${order.orderNumber}</h4>
            <p>${orderManager.formatOrderDate(order.createdAt)}</p>
          </div>
          <span class="order-status ${order.status.toLowerCase()}">${orderManager.getStatusDisplayText(order.status)}</span>
        </div>
        
        <div class="order-items-summary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span>${order.items.length} item${order.items.length > 1 ? 's' : ''}</span>
        </div>
        
        <div class="order-footer">
          <div class="order-total">
            Total: <strong>£${order.total.toFixed(2)}</strong>
          </div>
          <button class="btn-view-order" onclick="window.viewUserOrderDetails('${order.id}')">
            View Details
          </button>
        </div>
      </div>
    `).join('');

    // Setup the view details function
    (window as any).viewUserOrderDetails = (orderId: string) => {
      this.showUserOrderDetails(orderId);
    };
  }

  private showUserOrderDetails(orderId: string): void {
    const order = orderManager.getOrderById(orderId);
    if (!order) return;

    const modal = document.createElement('div');
    modal.className = 'order-detail-modal active';
    modal.innerHTML = `
      <div class="order-detail-content">
        <div class="order-detail-header">
          <h3>Order #${order.orderNumber}</h3>
          <button class="modal-close" onclick="this.closest('.order-detail-modal').remove()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="order-detail-body">
          <div class="order-detail-section">
            <h4>Order Information</h4>
            <p><strong>Order Date:</strong> ${orderManager.formatOrderDate(order.createdAt)}</p>
            <p><strong>Status:</strong> <span class="order-status ${order.status.toLowerCase()}">${orderManager.getStatusDisplayText(order.status)}</span></p>
          </div>
          
          <div class="order-detail-section">
            <h4>Order Items</h4>
            ${order.items.map(item => `
              <div class="order-detail-item">
                <img src="${item.product.image || '/logo.webp'}" alt="${item.product.title}">
                <div class="order-detail-item-info">
                  <h5>${item.product.title}</h5>
                  <p>Quantity: ${item.quantity}${item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}</p>
                </div>
                <div class="order-detail-item-price">£${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="order-detail-section">
            <h4>Shipping Address</h4>
            <p>
              ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.postcode}<br>
              ${order.shippingAddress.phone}
            </p>
          </div>
          
          <div class="order-detail-section">
            <h4>Order Summary</h4>
            <div class="order-summary-row">
              <span>Subtotal:</span>
              <span>£${order.subtotal.toFixed(2)}</span>
            </div>
            <div class="order-summary-row">
              <span>Shipping:</span>
              <span>${order.shipping === 0 ? 'FREE' : `£${order.shipping.toFixed(2)}`}</span>
            </div>
            <div class="order-summary-row total">
              <span>Total:</span>
              <span>£${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
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

  private loadUserSettings(): void {
    const user = authManager.getCurrentUser();
    if (!user) return;

    // Get settings from profile manager
    const settings = userProfileManager.getSettings(user.email);

    // Apply settings to toggles
    const settingsToggles = document.querySelectorAll('.settings-list .toggle-switch input') as NodeListOf<HTMLInputElement>;
    if (settingsToggles[0]) settingsToggles[0].checked = settings.emailNotifications;
    if (settingsToggles[1]) settingsToggles[1].checked = settings.smsNotifications;
    if (settingsToggles[2]) settingsToggles[2].checked = settings.marketingEmails;
  }

  private loadAdminPanel(): void {
    pageManager.loadPageFromTemplate(adminPanelTemplate);
    setTimeout(() => this.setupAdminPanel(), 200);
  }

  private async setupAdminPanel(): Promise<void> {
    // Wait for products and categories to load
    await productManager.waitForInit();
    await categoryManager.waitForInit();
    
    // Tab navigation (simpler than before)
    document.querySelectorAll('.admin-tab[data-section]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const section = (tab as HTMLElement).dataset.section;
        
        document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.admin-section').forEach(el => el.classList.remove('active'));
        
        tab.classList.add('active');
        document.querySelector(`.admin-section[data-section-content="${section}"]`)?.classList.add('active');
        
        // Load data when switching to orders tab
        if (section === 'orders') {
          this.loadAdminOrders();
        }
      });
    });

    // Load products
    this.loadProductsTable();

    // Add Product Modal
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm') as HTMLFormElement;
    
    // Move modal to body to escape admin-panel container
    if (productModal && productModal.parentElement) {
      document.body.appendChild(productModal);
      console.log('✅ Product modal moved to body');
    }
    
    document.getElementById('addProductBtn')?.addEventListener('click', () => {
      productForm?.reset();
      document.getElementById('productId')!.setAttribute('value', '');
      document.getElementById('productModalTitle')!.textContent = 'Add New Product';
      productModal?.classList.add('active');
      document.body.classList.add('modal-open');
    });

    document.getElementById('exportProductsBtn')?.addEventListener('click', () => {
      productManager.downloadJSON();
      UI.showNotification('✨ Products exported successfully!', { type: 'success' });
    });

    document.getElementById('closeProductModal')?.addEventListener('click', () => {
      productModal?.classList.add('closing');
      setTimeout(() => {
        productModal?.classList.remove('active', 'closing');
        document.body.classList.remove('modal-open');
      }, 300);
    });

    document.getElementById('cancelProductBtn')?.addEventListener('click', () => {
      productModal?.classList.add('closing');
      setTimeout(() => {
        productModal?.classList.remove('active', 'closing');
        document.body.classList.remove('modal-open');
      }, 300);
    });

    productForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(productForm);
      const productId = (document.getElementById('productId') as HTMLInputElement)?.value;
      
      // Parse sizes from comma-separated string
      const sizesString = formData.get('sizes') as string;
      const sizes = sizesString ? sizesString.split(',').map(s => s.trim()).filter(s => s.length > 0) : undefined;
      
      const productData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        badge: (formData.get('badge') as string) || undefined,
        sizes: sizes
      };

      if (productId && productId.trim() !== '') {
        await productManager.updateProduct(productId, productData);
        UI.showNotification('✨ Product updated successfully!', { type: 'success' });
      } else {
        await productManager.addProduct(productData);
        UI.showNotification('✨ Product added successfully!', { type: 'success' });
      }

      productModal?.classList.add('closing');
      setTimeout(() => {
        productModal?.classList.remove('active', 'closing');
        document.body.classList.remove('modal-open');
        this.loadProductsTable();
        productsDisplay.init();
      }, 300);
    });

    // Categories functionality
    this.loadCategoriesGrid();
    const categoryModal = document.getElementById('categoryModal');
    const categoryForm = document.getElementById('categoryForm') as HTMLFormElement;

    // Move category modal to body to escape admin-panel container
    if (categoryModal && categoryModal.parentElement) {
      document.body.appendChild(categoryModal);
      console.log('✅ Category modal moved to body');
    }

    document.getElementById('addCategoryBtn')?.addEventListener('click', () => {
      categoryForm?.reset();
      categoryModal?.classList.add('active');
      document.body.classList.add('modal-open');
    });

    document.getElementById('closeCategoryModal')?.addEventListener('click', () => {
      categoryModal?.classList.add('closing');
      setTimeout(() => {
        categoryModal?.classList.remove('active', 'closing');
        document.body.classList.remove('modal-open');
      }, 300);
    });

    document.getElementById('cancelCategoryBtn')?.addEventListener('click', () => {
      categoryModal?.classList.add('closing');
      setTimeout(() => {
        categoryModal?.classList.remove('active', 'closing');
        document.body.classList.remove('modal-open');
      }, 300);
    });

    categoryForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(categoryForm);
      const name = formData.get('name') as string;
      
      if (!name.trim()) {
        UI.showNotification('Please enter a category name', { type: 'error' });
        return;
      }

      // Add category using categoryManager
      categoryManager.addCategory(name);

      UI.showNotification('✨ Category added successfully!', { type: 'success' });
      categoryModal?.classList.add('closing');
      setTimeout(() => {
        categoryModal?.classList.remove('active', 'closing');
        document.body.classList.remove('modal-open');
        this.loadCategoriesGrid();
      }, 300);
    });
  }

  private loadCategoriesGrid(): void {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    const categories = categoryManager.getAllCategories();

    if (categories.length === 0) {
      grid.innerHTML = `
        <div class="categories-empty">
          <div class="categories-empty-icon">📦</div>
          <p>No categories yet. Click "Add New Category" to create one!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = categories.map(cat => `
      <div class="category-card">
        <div class="category-header">
          <h3 class="category-name">${cat.name}</h3>
          <button class="category-delete" onclick="window.deleteCategory('${cat.id}')" title="Delete category">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    `).join('');

    // Global delete function
    (window as any).deleteCategory = (id: string) => {
      if (confirm('Are you sure you want to delete this category?')) {
        categoryManager.deleteCategory(id);
        UI.showNotification('Category deleted', { type: 'info' });
        this.loadCategoriesGrid();
      }
    };
  }

  private loadAdminOrders(): void {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;

    // Get all orders from order manager
    const orders = orderManager.getAllOrders();
    
    // Update stats
    const totalOrdersEl = document.getElementById('totalOrders');
    const pendingOrdersEl = document.getElementById('pendingOrders');
    const completedOrdersEl = document.getElementById('completedOrders');
    
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length.toString();
    if (pendingOrdersEl) {
      const pending = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
      pendingOrdersEl.textContent = pending.toString();
    }
    if (completedOrdersEl) {
      const completed = orders.filter(o => o.status === 'delivered').length;
      completedOrdersEl.textContent = completed.toString();
    }
    
    if (orders.length === 0) {
      container.innerHTML = `
        <div class="products-empty">
          <div class="products-empty-icon">📦</div>
          <p>No orders yet. Orders will appear here when customers make purchases.</p>
        </div>
      `;
      return;
    }

    // Sort orders by date (newest first)
    const sortedOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt);

    container.innerHTML = sortedOrders.map(order => `
      <div class="admin-order-card">
        <div class="admin-order-header">
          <div class="admin-order-info">
            <h3>Order #${order.orderNumber}</h3>
            <p class="admin-order-date">${orderManager.formatOrderDate(order.createdAt)}</p>
            <p class="admin-order-customer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}
            </p>
          </div>
          <div class="admin-order-status">
            <span class="order-status-badge ${orderManager.getStatusBadgeClass(order.status)}">
              ${orderManager.getStatusDisplayText(order.status)}
            </span>
            <div class="admin-order-total">£${order.total.toFixed(2)}</div>
          </div>
        </div>
        <div class="admin-order-summary">
          <div class="admin-order-items">
            ${order.items.slice(0, 3).map(item => `
              <span class="admin-order-item-badge">
                ${item.quantity}x ${item.product.title}${item.selectedSize ? ` (${item.selectedSize})` : ''}
              </span>
            `).join('')}
            ${order.items.length > 3 ? `<span class="admin-order-item-badge">+${order.items.length - 3} more</span>` : ''}
          </div>
        </div>
        <div class="admin-order-actions">
          <button class="btn-icon" onclick="window.viewOrderDetails('${order.id}')" title="View Details">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          ${order.status !== 'delivered' ? `
            <button class="btn-icon success" onclick="window.markOrderDelivered('${order.id}')" title="Mark Delivered">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>
          ` : ''}
          ${order.status !== 'cancelled' ? `
            <button class="btn-icon danger" onclick="window.cancelOrder('${order.id}')" title="Cancel">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');

    // Setup global functions for order actions
    (window as any).viewOrderDetails = (orderId: string) => {
      this.showOrderDetails(orderId);
    };

    (window as any).markOrderDelivered = async (orderId: string) => {
      if (confirm('Mark this order as delivered?')) {
        const success = await orderManager.updateOrderStatus(orderId, 'delivered');
        if (success) {
          UI.showNotification('✅ Order marked as delivered and saved to data/orders.json', { type: 'success' });
          this.loadAdminOrders();
        } else {
          UI.showNotification('❌ Failed to update order', { type: 'error' });
        }
      }
    };

    (window as any).cancelOrder = async (orderId: string) => {
      if (confirm('Are you sure you want to cancel this order?')) {
        const success = await orderManager.updateOrderStatus(orderId, 'cancelled');
        if (success) {
          UI.showNotification('Order cancelled and saved to data/orders.json', { type: 'info' });
          this.loadAdminOrders();
        } else {
          UI.showNotification('❌ Failed to cancel order', { type: 'error' });
        }
      }
    };
  }

  private showOrderDetails(orderId: string): void {
    const order = orderManager.getOrderById(orderId);
    if (!order) return;

    const modal = document.getElementById('orderModal');
    const modalBody = document.getElementById('orderModalBody');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="order-detail-section">
        <h3>Order Information</h3>
        <div class="order-detail-grid">
          <div class="order-detail-item">
            <span class="detail-label">Order Number</span>
            <span class="detail-value">${order.orderNumber}</span>
          </div>
          <div class="order-detail-item">
            <span class="detail-label">Status</span>
            <span class="order-status-badge ${orderManager.getStatusBadgeClass(order.status)}">
              ${orderManager.getStatusDisplayText(order.status)}
            </span>
          </div>
          <div class="order-detail-item">
            <span class="detail-label">Order Date</span>
            <span class="detail-value">${orderManager.formatOrderDate(order.createdAt)}</span>
          </div>
          <div class="order-detail-item">
            <span class="detail-label">Payment Method</span>
            <span class="detail-value">${order.paymentDetails.method === 'card' ? 'Credit/Debit Card' : 'PayPal'}</span>
          </div>
        </div>
      </div>

      <div class="order-detail-section">
        <h3>Customer Information</h3>
        <div class="order-detail-grid">
          <div class="order-detail-item">
            <span class="detail-label">Name</span>
            <span class="detail-value">${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</span>
          </div>
          <div class="order-detail-item">
            <span class="detail-label">Email</span>
            <span class="detail-value">${order.shippingAddress.email}</span>
          </div>
          <div class="order-detail-item">
            <span class="detail-label">Phone</span>
            <span class="detail-value">${order.shippingAddress.phone}</span>
          </div>
        </div>
      </div>

      <div class="order-detail-section">
        <h3>Shipping Address</h3>
        <div class="order-detail-address">
          ${order.shippingAddress.address}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.postcode}<br>
          United Kingdom
        </div>
        ${order.shippingAddress.notes ? `
          <div class="order-detail-notes">
            <strong>Delivery Notes:</strong> ${order.shippingAddress.notes}
          </div>
        ` : ''}
      </div>

      <div class="order-detail-section">
        <h3>Order Items</h3>
        <div class="order-detail-items">
          ${order.items.map(item => `
            <div class="order-detail-item-row">
              <div class="order-detail-item-info">
                <div class="order-detail-item-image" style="background-image: url('${item.product.image || '/logo.webp'}')"></div>
                <div>
                  <div class="order-detail-item-title">${item.product.title}</div>
                  ${item.selectedSize ? `<div class="order-detail-item-size">Size: ${item.selectedSize}</div>` : ''}
                  <div class="order-detail-item-qty">Quantity: ${item.quantity}</div>
                </div>
              </div>
              <div class="order-detail-item-price">£${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="order-detail-section">
        <h3>Order Summary</h3>
        <div class="order-detail-totals">
          <div class="order-detail-total-row">
            <span>Subtotal</span>
            <span>£${order.subtotal.toFixed(2)}</span>
          </div>
          <div class="order-detail-total-row">
            <span>Shipping</span>
            <span>${order.shipping === 0 ? 'FREE' : `£${order.shipping.toFixed(2)}`}</span>
          </div>
          <div class="order-detail-total-row total">
            <strong>Total</strong>
            <strong>£${order.total.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <div class="order-detail-actions">
        ${order.status !== 'delivered' ? `
          <button class="btn btn-primary" onclick="window.markOrderDelivered('${order.id}'); document.getElementById('orderModal').classList.remove('active'); document.body.classList.remove('modal-open');">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Mark as Delivered
          </button>
        ` : ''}
        <button class="btn btn-secondary" onclick="window.print()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Order
        </button>
      </div>
    `;

    // Move modal to body if needed
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    // Setup close button
    document.getElementById('closeOrderModal')?.addEventListener('click', () => {
      modal.classList.add('closing');
      setTimeout(() => {
        modal.classList.remove('active', 'closing');
        document.body.classList.remove('modal-open');
      }, 300);
    });
  }

  private loadProductsTable(): void {
    const container = document.getElementById('productsTableBody');
    if (!container) return;

    const products = productManager.getAllProducts();
    
    if (products.length === 0) {
      container.innerHTML = `
        <div class="products-empty">
          <div class="products-empty-icon">🛍️</div>
          <p>No products yet. Click "Add New Product" to get started!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(product => `
      <div class="product-card">
        ${product.image ? `
          <div class="product-card-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy" />
          </div>
        ` : ''}
        <div class="product-card-main">
          <h3 class="product-card-title">${product.title}</h3>
          <div class="product-card-price">£${product.price.toFixed(2)}</div>
        </div>
        <div class="product-card-actions">
          <button class="btn-action" onclick="window.editProduct('${product.id}')" title="Edit this product">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span>Edit</span>
          </button>
          <button class="btn-action danger" onclick="window.deleteProduct('${product.id}')" title="Delete this product">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
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
      (document.getElementById('productSizes') as HTMLInputElement).value = product.sizes ? product.sizes.join(', ') : '';
      
      document.getElementById('productModalTitle')!.textContent = 'Edit Product';
      document.getElementById('productModal')?.classList.add('active');
      document.body.classList.add('modal-open');
    };

    (window as any).deleteProduct = async (id: string) => {
      if (confirm('Are you sure you want to delete this product? This cannot be undone.')) {
        await productManager.deleteProduct(id);
        UI.showNotification('🗑️ Product deleted', { type: 'success' });
        this.loadProductsTable();
        productsDisplay.init();
      }
    };
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

    // Load categories into filter modal
    this.loadCategoryFilter();
  }

  private async loadCategoryFilter(): Promise<void> {
    // Wait for categories to load
    await categoryManager.waitForInit();
    
    const categoryList = document.getElementById('categoryFilterList');
    if (!categoryList) return;

    const categories = categoryManager.getAllCategories();

    if (categories.length === 0) {
      categoryList.innerHTML = `
        <div class="category-filter-empty">
          <div class="category-filter-empty-icon">📦</div>
          <p>No categories available yet.</p>
          <p style="font-size: 0.85rem; margin-top: 8px;">Categories can be added from the admin panel.</p>
        </div>
      `;
      return;
    }

    // Add "All Products" option
    let html = `
      <div class="category-filter-item active" data-category="all">
        <span>All Products</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    `;

    // Add category options
    categories.forEach(cat => {
      html += `
        <div class="category-filter-item" data-category="${cat.id}">
          <span>${cat.name}</span>
        </div>
      `;
    });

    categoryList.innerHTML = html;

    // Handle category selection
    const items = categoryList.querySelectorAll('.category-filter-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        // Update active state
        items.forEach(i => {
          i.classList.remove('active');
          i.querySelector('svg')?.remove();
        });
        item.classList.add('active');
        
        // Add checkmark
        if (!item.querySelector('svg')) {
          item.innerHTML += `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
        }

        const categoryId = (item as HTMLElement).dataset.category;
        console.log('Category selected:', categoryId);
        
        // TODO: Filter products by category
        // For now, this just logs the selection
        // Future enhancement: Filter productsDisplay by category
        
        // Close modal after selection
        setTimeout(() => {
          document.getElementById('categoryFilterModal')?.classList.remove('active');
        }, 300);
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
