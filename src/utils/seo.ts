// SEO Manager - Dynamic Meta Tags and Schema

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  schema?: any;
}

export class SEOManager {
  private baseUrl = 'https://blisshairstudio.co.uk';
  private defaultImage = `${this.baseUrl}/logo.webp`;
  
  updateMeta(config: SEOConfig): void {
    // Update title
    document.title = `${config.title} | BlissHairStudio - Award-Winning Hair Salon`;
    
    // Update meta description
    this.setMetaTag('description', config.description);
    this.setMetaTag('keywords', config.keywords);
    
    // Open Graph tags
    this.setMetaTag('og:title', config.title, 'property');
    this.setMetaTag('og:description', config.description, 'property');
    this.setMetaTag('og:image', config.ogImage || this.defaultImage, 'property');
    this.setMetaTag('og:url', config.canonical || window.location.href, 'property');
    this.setMetaTag('og:type', config.ogType || 'website', 'property');
    this.setMetaTag('og:site_name', 'BlissHairStudio', 'property');
    
    // Twitter Card tags
    this.setMetaTag('twitter:card', 'summary_large_image');
    this.setMetaTag('twitter:title', config.title);
    this.setMetaTag('twitter:description', config.description);
    this.setMetaTag('twitter:image', config.ogImage || this.defaultImage);
    
    // Canonical URL
    this.setCanonical(config.canonical || window.location.href);
    
    // Schema.org structured data
    if (config.schema) {
      this.updateSchema(config.schema);
    }
  }
  
  private setMetaTag(name: string, content: string, attr: string = 'name'): void {
    let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, name);
      document.head.appendChild(element);
    }
    
    element.content = content;
  }
  
  private setCanonical(url: string): void {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    
    link.href = url;
  }
  
  private updateSchema(schema: any): void {
    let script = document.querySelector('script[type="application/ld+json"]#dynamic-schema') as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'dynamic-schema';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(schema);
  }
  
  // Page-specific SEO configs
  getHomeSEO(): SEOConfig {
    return {
      title: 'Home',
      description: 'Award-winning hair salon in the UK. Expert stylists Maxine & Carla offer precision cuts, color treatments, and hair repair. 500+ 5-star reviews. Book your transformation today!',
      keywords: 'hair salon uk, best hairdresser, hair color, hair cuts, bliss hair studio, maxine hair stylist, carla hairdresser, balayage, keratin treatment, hair repair',
      ogType: 'website',
      schema: {
        "@context": "https://schema.org",
        "@type": "HairSalon",
        "name": "BlissHairStudio",
        "image": `${this.baseUrl}/logo.webp`,
        "url": this.baseUrl,
        "telephone": "+44-123-456-7890",
        "priceRange": "££",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "GB"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 52.9542908,
          "longitude": -0.1670339
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "500"
        }
      }
    };
  }
  
  getProductsSEO(): SEOConfig {
    return {
      title: 'Premium Hair Products',
      description: 'Shop professional-grade hair care products at BlissHairStudio. Authentic brands, expert recommendations, and products used by our award-winning stylists.',
      keywords: 'hair products uk, professional hair care, shampoo, conditioner, hair treatment, styling products, authentic hair products',
      schema: {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "BlissHairStudio Shop",
        "description": "Premium hair care products",
        "url": `${this.baseUrl}/products`
      }
    };
  }
  
  getAboutSEO(): SEOConfig {
    return {
      title: 'About Us',
      description: 'Meet Maxine & Carla, the expert stylists behind BlissHairStudio. Over 20 years of combined experience in hair styling, coloring, and treatments. Learn our story.',
      keywords: 'about bliss hair studio, maxine stylist, carla hairdresser, hair salon team, professional stylists uk',
      schema: {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About BlissHairStudio",
        "description": "Learn about our expert stylists and our passion for beautiful hair"
      }
    };
  }
  
  getServicesSEO(): SEOConfig {
    return {
      title: 'Hair Services & Treatments',
      description: 'Professional hair services: precision cuts from £30, color treatments from £45, balayage from £120, keratin treatments from £150. Expert styling for all occasions.',
      keywords: 'hair services, hair cutting, hair coloring, balayage, highlights, keratin treatment, hair styling, wedding hair, hair treatments',
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Hair Salon Services",
        "provider": {
          "@type": "HairSalon",
          "name": "BlissHairStudio"
        },
        "areaServed": "United Kingdom",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Hair Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Women's Cut & Style",
                "description": "Personalized cuts tailored to your face shape"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Balayage",
                "description": "Hand-painted, natural-looking color"
              }
            }
          ]
        }
      }
    };
  }
  
  getContactSEO(): SEOConfig {
    return {
      title: 'Contact Us',
      description: 'Get in touch with BlissHairStudio. Book a consultation, ask questions, or visit our salon. Open Monday-Saturday 9AM-6PM. Call +44 123 456 7890.',
      keywords: 'contact bliss hair studio, book appointment, hair salon location, hair consultation, visit hair salon'
    };
  }
  
  getCheckoutSEO(): SEOConfig {
    return {
      title: 'Secure Checkout',
      description: 'Complete your order securely at BlissHairStudio. Safe payment processing and fast delivery on all premium hair products.',
      keywords: 'checkout, buy hair products, secure payment, hair product delivery'
    };
  }
  
  getAccountSEO(): SEOConfig {
    return {
      title: 'My Account',
      description: 'Manage your BlissHairStudio account. View orders, save addresses, and update your profile.',
      keywords: 'account, my orders, profile, customer account'
    };
  }
}

export const seoManager = new SEOManager();
