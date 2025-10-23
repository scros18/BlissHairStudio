# BlissHairStudio Website 💝

A beautiful, modern, and mobile-first website for BlissHairStudio - Premium hair care products and styling services.

## Features ✨

### Design
- **Mobile-First Responsive Design** - Perfect for all devices, optimized for mobile users
- **Modern & Minimalistic** - Clean, elegant design with smooth animations
- **Color Scheme** - Inspired by the BlissHairStudio logo (soft pinks and rose tones)
- **Beautiful Typography** - Playfair Display for headings, Poppins for body text

### Functionality
- **Smooth Navigation** - Fixed navbar with smooth scroll and mobile menu
- **Product Showcase** - Sample product with "Add to Cart" functionality
- **Shopping Cart** - Interactive cart with item counter
- **Contact Form** - Easy communication with validation
- **Newsletter Signup** - Email subscription functionality
- **Testimonials** - Customer reviews section
- **Services Display** - Showcase of all offered services
- **SEO Optimized** - Complete meta tags, schema markup, and semantic HTML

### Technical Features
- **Performance Optimized** - Fast loading, minimal dependencies
- **Accessible** - WCAG compliant with keyboard navigation
- **Progressive Enhancement** - Works without JavaScript
- **Cross-Browser Compatible** - Tested on all major browsers
- **Offline Detection** - Notifies users when offline

## File Structure

```
blisshairstudio/
├── index.html          # Main HTML file with semantic markup
├── styles.css          # Complete responsive CSS with mobile-first approach
├── script.js           # Interactive JavaScript features
├── logo.webp           # BlissHairStudio logo
└── README.md           # This file
```

## How to Use 🚀

### Basic Setup
1. Simply open `index.html` in any modern web browser
2. No build process or dependencies required!
3. Works offline after first load

### For Development
1. Use a local server for best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using VS Code Live Server extension
   Right-click index.html → "Open with Live Server"
   ```

2. Open in browser: `http://localhost:8000`

## Adding Products 🛍️

To add more products, find the sample product in `index.html` and duplicate the structure:

```html
<article class="product-card" itemscope itemtype="http://schema.org/Product">
    <div class="product-badge">New</div>
    <div class="product-image">
        <!-- Add your product image here -->
        <img src="path-to-image.jpg" alt="Product Name" itemprop="image">
    </div>
    <div class="product-info">
        <h3 class="product-title" itemprop="name">Your Product Name</h3>
        <p class="product-description" itemprop="description">Your product description</p>
        <div class="product-details">
            <span class="product-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                <meta itemprop="priceCurrency" content="GBP">
                <span itemprop="price">£XX.XX</span>
            </span>
            <button class="btn btn-add-to-cart">Add to Cart</button>
        </div>
    </div>
</article>
```

## Customization 🎨

### Colors
All colors are defined as CSS variables in `styles.css`:

```css
:root {
    --primary-color: #E8B4B8;      /* Main pink */
    --primary-dark: #d89ca1;       /* Darker pink */
    --primary-light: #f5d6d9;      /* Lighter pink */
    --secondary-color: #C89FA5;    /* Secondary rose */
    --accent-color: #f4c7cc;       /* Accent pink */
}
```

### Content
- **Business Info**: Update contact details in the Contact section
- **Services**: Modify the Services section with your actual offerings
- **About Text**: Personalize the About section
- **Social Media**: Update social media links in the footer

## SEO Features 🔍

- Complete meta tags for search engines
- Open Graph tags for social media sharing
- Schema.org structured data for products
- Semantic HTML5 markup
- Descriptive alt texts (add to product images)
- Fast loading speed
- Mobile-friendly (Google ranking factor)

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance 📊

- **No external dependencies** except Google Fonts
- **Lightweight** - Total size under 100KB
- **Fast loading** - Optimized CSS and JavaScript
- **Lazy loading** support for images

## Future Enhancements 💡

To make this a fully functional e-commerce site, consider adding:

1. **Backend Integration**
   - Connect contact form to email service (EmailJS, Formspree, or custom backend)
   - Implement real shopping cart with local storage or database
   - Add product management system

2. **Payment Integration**
   - Stripe, PayPal, or Square for payments
   - Checkout page with order summary
   - Order confirmation emails

3. **Additional Features**
   - Product filtering and search
   - Customer accounts and order history
   - Product reviews and ratings
   - Image gallery for products
   - Blog section for hair care tips

4. **Analytics**
   - Google Analytics integration
   - Conversion tracking
   - User behavior analysis

## Accessibility ♿

- ARIA labels for interactive elements
- Keyboard navigation support
- Focus trap in mobile menu
- Color contrast meeting WCAG AA standards
- Reduced motion support for animations

## License

This website was created for BlissHairStudio. All rights reserved.

## Support

For questions or customization requests, contact the developer.

---

Made with 💝 for BlissHairStudio
