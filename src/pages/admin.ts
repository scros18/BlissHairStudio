// Admin Panel Page Template
// Redesigned for maximum simplicity and user-friendliness

export function adminPanelTemplate(): string {
  return `
    <div class="admin-panel">
      <!-- Simple Top Bar -->
      <div class="admin-header">
        <div class="admin-brand">
          <img src="/logo-transparent.svg" alt="Bliss Hair Studio" class="admin-brand-logo" />
          <div>
            <h1 class="admin-brand-title">Admin Dashboard</h1>
          </div>
        </div>
        <div class="admin-header-actions">
          <a href="/" class="btn-back-site">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>View Website</span>
          </a>
        </div>
      </div>

      <!-- Simple Tab Navigation -->
      <div class="admin-tabs">
        <button class="admin-tab active" data-section="products">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span>Products</span>
        </button>
        <button class="admin-tab" data-section="categories">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 3h7v7H3z"/>
            <path d="M14 3h7v7h-7z"/>
            <path d="M14 14h7v7h-7z"/>
            <path d="M3 14h7v7H3z"/>
          </svg>
          <span>Categories</span>
        </button>
      </div>

      <div class="admin-main">
        
        <!-- Products Section -->
        <div class="admin-section active" data-section-content="products">
          <h2 class="admin-section-title">Your Products</h2>
          <div class="admin-section-header">
            <div class="admin-section-buttons">
              <button class="btn btn-add-large" id="addProductBtn" title="Click to add a new product">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>Add New Product</span>
              </button>
              <button class="btn btn-add-large secondary" id="exportProductsBtn" title="Download products as JSON">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          <div class="admin-content">
            <div class="products-list" id="productsTableBody">
              <!-- Products will be loaded here -->
            </div>
          </div>
        </div>

        <!-- Categories Section -->
        <div class="admin-section" data-section-content="categories">
          <h2 class="admin-section-title">Product Categories</h2>
          <div class="admin-section-header">
            <button class="btn btn-add-large" id="addCategoryBtn" title="Click to add a new category">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>Add New Category</span>
            </button>
          </div>

          <div class="admin-content">
            <div class="categories-grid" id="categoriesGrid">
              <!-- Categories will be loaded here -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div class="modal" id="productModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="productModalTitle">Add New Product</h2>
          <button class="modal-close" id="closeProductModal" title="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <form id="productForm">
          <input type="hidden" id="productId" name="id" />
          
          <div class="form-group">
            <label class="form-label">
              <span>Product Name</span>
              <span class="form-required">*</span>
            </label>
            <input 
              type="text" 
              class="form-input" 
              id="productTitle" 
              name="title" 
              placeholder="e.g., Davroe Moisture Shampoo"
              required 
            />
            <span class="form-hint">Give your product a clear, descriptive name</span>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Description</span>
              <span class="form-required">*</span>
            </label>
            <textarea 
              class="form-input form-textarea" 
              id="productDescription" 
              name="description" 
              rows="4" 
              placeholder="Tell customers about this product..."
              required
            ></textarea>
            <span class="form-hint">Describe what makes this product special</span>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Price</span>
              <span class="form-required">*</span>
            </label>
            <div class="input-with-prefix">
              <span class="input-prefix">£</span>
              <input 
                type="number" 
                class="form-input" 
                id="productPrice" 
                name="price" 
                step="0.01" 
                min="0" 
                placeholder="0.00"
                required 
              />
            </div>
            <span class="form-hint">Enter the product price in pounds</span>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Badge</span>
              <span class="form-optional">(Optional)</span>
            </label>
            <input 
              type="text" 
              class="form-input" 
              id="productBadge" 
              name="badge" 
              placeholder="e.g., New, Sale, Popular" 
            />
            <span class="form-hint">Add a special label like "New" or "Sale"</span>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Available Sizes</span>
              <span class="form-optional">(Optional)</span>
            </label>
            <input 
              type="text" 
              class="form-input" 
              id="productSizes" 
              name="sizes" 
              placeholder="e.g., 325ml, 1L" 
            />
            <span class="form-hint">Enter sizes separated by commas (e.g., "325ml, 1L, 200ml")</span>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-cancel" id="cancelProductBtn">
              Cancel
            </button>
            <button type="submit" class="btn btn-save">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div class="modal" id="categoryModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New Category</h2>
          <button class="modal-close" id="closeCategoryModal" title="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <form id="categoryForm">
          <div class="form-group">
            <label class="form-label">
              <span>Category Name</span>
              <span class="form-required">*</span>
            </label>
            <input 
              type="text" 
              class="form-input" 
              id="categoryName" 
              name="name" 
              placeholder="e.g., Shampoos, Conditioners..."
              required 
            />
            <span class="form-hint">Choose a name for this product category</span>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-cancel" id="cancelCategoryBtn">
              Cancel
            </button>
            <button type="submit" class="btn btn-save">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Add Category</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
