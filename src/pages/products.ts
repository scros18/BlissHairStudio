// Products Page Template
export const productsPageTemplate = (): string => {
  return `
    <!-- Products Hero -->
    <section class="products-hero">
        <div class="container">
            <div class="products-hero-content">
                <span class="section-tag">Premium Collection</span>
                <h1>Discover Your Perfect Hair Care</h1>
                <p>Professional-grade products delivered to your door</p>
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section class="products-section">
        <div class="container">
            <div class="products-filter">
                <button class="filter-btn active" data-filter="all">All Products</button>
                <button class="filter-btn" data-filter="treatments">Treatments</button>
                <button class="filter-btn" data-filter="styling">Styling</button>
                <button class="filter-btn" data-filter="care">Daily Care</button>
            </div>
            
            <div class="products-grid" id="productsGrid">
                <!-- Products will be dynamically loaded -->
            </div>
            
            <div class="products-cta">
                <div class="cta-box">
                    <h3>Not sure which product is right for you?</h3>
                    <p>Get a free personalized hair care consultation from our experts</p>
                    <a href="/contact" class="btn btn-secondary">Get Free Consultation</a>
                </div>
            </div>
        </div>
    </section>
  `;
};
