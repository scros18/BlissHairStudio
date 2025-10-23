// Clients Gallery Page - Hair Transformation Showcase
export function clientsPageTemplate(): string {
  return `
    <div class="clients-page">
      <!-- Hero Section -->
      <section class="page-hero clients-hero">
        <div class="container">
          <h1>Our Beautiful Clients</h1>
          <p>Real transformations, real results</p>
        </div>
      </section>

      <!-- Gallery Section -->
      <section class="clients-gallery-section">
        <div class="container">
          <div class="gallery-header">
            <h2>Hair Transformations</h2>
            <p class="gallery-subtitle">Discover the stunning work we create for our valued clients</p>
          </div>

          <!-- Gallery Grid -->
          <div class="clients-gallery-grid" id="galleryGrid">
            <!-- Gallery items will be dynamically loaded -->
          </div>

          <!-- Load More Button -->
          <div class="gallery-actions">
            <button class="btn-load-more" id="loadMoreBtn">
              <span>View More</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Lightbox Modal -->
      <div class="lightbox" id="lightbox">
        <button class="lightbox-close" id="lightboxClose">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button class="lightbox-nav lightbox-next" id="lightboxNext">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div class="lightbox-content">
          <img src="" alt="Client Hair Transformation" id="lightboxImage" />
          <div class="lightbox-counter" id="lightboxCounter">1 / 12</div>
        </div>
      </div>
    </div>
  `;
}

// Gallery Data - Dynamically load all JPEG images from /public/clients/
let galleryData: Array<{id: number, image: string, alt: string}> = [];

// Generate gallery data from image count (will be populated on init)
function generateGalleryData() {
  // These will be loaded dynamically - the actual images are in /public/clients/
  const imageCount = 12; // Update this if you add more images
  galleryData = Array.from({ length: imageCount }, (_, i) => ({
    id: i + 1,
    image: `/clients/${i + 1}.jpeg`,
    alt: `Beautiful hair transformation and styling by BlissHairStudio - Image ${i + 1}`
  }));
}

let currentImageIndex = 0;
let visibleItems = 12; // Show all items by default

export function initClientsGallery() {
  generateGalleryData();
  loadGalleryItems();
  setupLightbox();
  setupLoadMore();
}

function loadGalleryItems() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) {
    console.error('Gallery grid not found');
    return;
  }

  const itemsToShow = galleryData.slice(0, visibleItems);
  
  console.log('Loading gallery items:', itemsToShow); // Debug log
  
  if (itemsToShow.length === 0) {
    grid.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">No images available yet. Coming soon!</p>';
    return;
  }
  
  grid.innerHTML = itemsToShow.map((item, index) => `
    <div class="gallery-item" data-index="${index}">
      <div class="gallery-item-inner">
        <img 
          src="${item.image}" 
          alt="${item.alt}" 
          loading="lazy" 
          width="400" 
          height="400"
          style="width: 100%; height: 100%; object-fit: cover;"
          onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;background:#f0f0f0;color:#666;\\'>Image ${index + 1}</div>'; console.error('Failed to load:', this.src);" 
        />
        <div class="gallery-item-overlay">
          <button class="gallery-view-btn" aria-label="View full image">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Add click handlers
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index') || '0');
      openLightbox(index);
    });
  });
}

function setupLoadMore() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!loadMoreBtn) return;

  // Hide load more button since we're showing all images
  if (visibleItems >= galleryData.length) {
    loadMoreBtn.style.display = 'none';
  }
}

function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lightbox || !closeBtn || !prevBtn || !nextBtn) return;

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showNextImage();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      showPrevImage();
    }
  }
}

function openLightbox(index: number) {
  currentImageIndex = index;
  updateLightboxImage();
  
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
  updateLightboxImage();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryData.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const image = document.getElementById('lightboxImage') as HTMLImageElement;
  const counter = document.getElementById('lightboxCounter');
  
  if (image && counter) {
    const currentItem = galleryData[currentImageIndex];
    image.src = currentItem.image;
    image.alt = currentItem.alt;
    counter.textContent = `${currentImageIndex + 1} / ${galleryData.length}`;
  }
}
