// Navigation Component

import { authManager } from '../utils/authManager';

export class Navigation {
  private menuToggle: HTMLElement | null = null;
  private navMenu: HTMLElement | null = null;
  private navbar: HTMLElement | null = null;
  private authButton: HTMLElement | null = null;

  init(): void {
    this.menuToggle = document.getElementById('menuToggle');
    this.navMenu = document.getElementById('navMenu');
    this.navbar = document.getElementById('navbar');
    this.authButton = document.getElementById('authButton');
    
    if (this.menuToggle && this.navMenu) {
      this.setupMobileMenu();
    }
    
    if (this.authButton) {
      this.setupAuthDropdown();
    }
    
    this.setupScrollEffect();
    this.setupSmoothScroll();
    this.highlightActiveLink();
  }

  private setupMobileMenu(): void {
    this.menuToggle!.addEventListener('click', () => {
      const isActive = this.menuToggle!.classList.toggle('active');
      this.navMenu!.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      
      // Update ARIA for accessibility
      this.menuToggle!.setAttribute('aria-expanded', isActive.toString());
    });
    
    this.navMenu!.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.menuToggle!.classList.remove('active');
        this.navMenu!.classList.remove('active');
        document.body.classList.remove('no-scroll');
        this.menuToggle!.setAttribute('aria-expanded', 'false');
      });
    });
  }

  private setupScrollEffect(): void {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (this.navbar) {
        if (currentScroll > 100) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
      }
      
      this.highlightActiveLink();
    });
  }

  private setupSmoothScroll(): void {
    // Handle hash links (anchor links within pages)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = (target as HTMLElement).offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  private highlightActiveLink(): void {
    const scrollPosition = window.scrollY + 150;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  private setupAuthDropdown(): void {
    // Create backdrop overlay
    const overlay = document.createElement('div');
    overlay.className = 'auth-dropdown-overlay';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);
    
    const dropdown = document.createElement('div');
    dropdown.className = 'auth-dropdown';
    dropdown.style.display = 'none';
    
    const isAuthenticated = authManager.isLoggedIn();
    const currentUser = authManager.getCurrentUser();
    
    if (isAuthenticated && currentUser) {
      const firstName = currentUser.name ? currentUser.name.split(' ')[0] : 'User';
      dropdown.innerHTML = `
        <div class="auth-dropdown-header">
          <div class="auth-dropdown-avatar">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="5"/>
              <path d="M3 21v-2a7 7 0 0 1 14 0v2"/>
            </svg>
          </div>
          <div class="auth-dropdown-info">
            <div class="auth-dropdown-name">Hey, ${firstName}! ✨</div>
            <div class="auth-dropdown-email">${currentUser.email}</div>
          </div>
        </div>
        <div class="auth-dropdown-divider"></div>
        <a href="/account" class="auth-dropdown-item">
          <div class="auth-dropdown-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span>My Account</span>
        </a>
        <a href="/account" data-tab="orders" class="auth-dropdown-item">
          <div class="auth-dropdown-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <span>My Orders</span>
        </a>
        <a href="/account" data-tab="settings" class="auth-dropdown-item">
          <div class="auth-dropdown-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
          <span>Notifications</span>
          <span class="auth-dropdown-badge">3</span>
        </a>
        <div class="auth-dropdown-divider"></div>
        <button class="auth-dropdown-item auth-dropdown-logout" id="dropdownLogout">
          <div class="auth-dropdown-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
          <span>Logout</span>
        </button>
      `;
    } else {
      dropdown.innerHTML = `
        <div class="auth-dropdown-guest">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          </svg>
          <h4>Welcome to Bliss</h4>
          <p>Sign in to unlock exclusive rewards!</p>
        </div>
        <div class="auth-dropdown-divider"></div>
        <a href="/account" class="auth-dropdown-btn auth-dropdown-btn-primary">
          <span>Sign In</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </a>
        <a href="/account#register" class="auth-dropdown-btn auth-dropdown-btn-secondary">
          <span>Create Account</span>
        </a>
      `;
    }
    
    this.authButton!.parentElement!.style.position = 'relative';
    this.authButton!.parentElement!.appendChild(dropdown);
    
    // Toggle dropdown
    this.authButton!.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close cart if open
      this.closeAllDropdowns();
      
      const isVisible = dropdown.style.display !== 'none';
      dropdown.style.display = isVisible ? 'none' : 'block';
      overlay.style.display = isVisible ? 'none' : 'block';
      
      if (!isVisible) {
        setTimeout(() => {
          dropdown.classList.add('show');
          overlay.classList.add('show');
        }, 10);
      } else {
        dropdown.classList.remove('show');
        overlay.classList.remove('show');
      }
    });
    
    // Close dropdown when clicking overlay
    overlay.addEventListener('click', () => {
      dropdown.style.display = 'none';
      dropdown.classList.remove('show');
      overlay.style.display = 'none';
      overlay.classList.remove('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.authButton!.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
        dropdown.style.display = 'none';
        dropdown.classList.remove('show');
        overlay.style.display = 'none';
        overlay.classList.remove('show');
      }
    });
    
    // Handle logout
    if (isAuthenticated) {
      dropdown.querySelector('#dropdownLogout')?.addEventListener('click', () => {
        authManager.logout();
        window.location.href = '/';
      });
    }
    
    // Prevent dropdown links from closing on click
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.style.display = 'none';
        dropdown.classList.remove('show');
        overlay.style.display = 'none';
        overlay.classList.remove('show');
      });
    });
  }
  
  private closeAllDropdowns(): void {
    // Close cart
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartDropdown) {
      cartDropdown.classList.remove('active');
    }
    if (cartOverlay) {
      (cartOverlay as HTMLElement).style.display = 'none';
    }
    document.body.classList.remove('no-scroll');
  }
}

export const navigation = new Navigation();
