// Admin Panel Page Template

export function adminPanelTemplate(): string {
  return `
    <div class="admin-panel">
      <div class="admin-sidebar">
        <div class="admin-logo">
          <img src="/logo-transparent.svg" alt="Bliss Hair Studio" />
          <h2>Admin Panel</h2>
        </div>
        <nav class="admin-nav">
          <button class="admin-nav-item active" data-section="products">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span>Products</span>
          </button>
          <button class="admin-nav-item" data-section="categories">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3h7v7H3z"/>
              <path d="M14 3h7v7h-7z"/>
              <path d="M14 14h7v7h-7z"/>
              <path d="M3 14h7v7H3z"/>
            </svg>
            <span>Categories</span>
          </button>
          <a href="/" class="admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Back to Site</span>
          </a>
        </nav>
      </div>

      <div class="admin-main">
        <!-- Products Section -->
        <div class="admin-section active" data-section-content="products">
          <div class="admin-header">
            <div>
                <!-- Topbar: search + quick actions + user chip -->
                <div class="admin-topbar">
                  <div class="topbar-left">
                    <div class="search-bar">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <input id="adminSearch" class="search-input" type="search" placeholder="Search products, categories..." aria-label="Search" />
                    </div>
                  </div>
                  <div class="topbar-right">
                    <button class="btn btn-secondary-outline btn-sm" id="addProductBtnTop">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      <span>New Product</span>
                    </button>
                    <div class="user-chip" title="Admin">
                      <div class="avatar">MC</div>
                      <div class="user-info">
                        <span class="user-name">Maxine</span>
                        <span class="user-role">Administrator</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Quick stats -->
                <div class="stats-grid">
                  <div class="stat-card-glossy">
                    <div class="stat-top">
                      <span class="stat-label">Products</span>
                      <span class="stat-pill">Live</span>
                    </div>
                    <div class="stat-value">—</div>
                    <div class="stat-foot">Total items in catalog</div>
                  </div>
                  <div class="stat-card-glossy">
                    <div class="stat-top">
                      <span class="stat-label">Orders</span>
                      <span class="stat-pill neutral">Today</span>
                    </div>
                    <div class="stat-value">—</div>
                    <div class="stat-foot">Recent orders</div>
                  </div>
                  <div class="stat-card-glossy">
                    <div class="stat-top">
                      <span class="stat-label">Revenue</span>
                      <span class="stat-pill success">This week</span>
                    </div>
                    <div class="stat-value">£—</div>
                    <div class="stat-foot">Gross sales</div>
                  </div>
                </div>
              <h1>Products</h1>
              <p class="admin-subtitle">Manage your product catalog</p>
            </div>
            <button class="btn btn-primary" id="addProductBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Product
            </button>
          </div>

          <div class="admin-card">
            <div class="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Badge</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="productsTableBody">
                  <!-- Products will be loaded here -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Categories Section -->
        <div class="admin-section" data-section-content="categories">
          <div class="admin-header">
            <div>
              <h1>Categories</h1>
              <p class="admin-subtitle">Organize your products</p>
            </div>
            <button class="btn btn-primary" id="addCategoryBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Category
            </button>
          </div>

          <div class="admin-card">
            <div class="categories-grid" id="categoriesGrid">
              <!-- Categories will be loaded here -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div class="modal" id="productModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="productModalTitle">Add Product</h2>
          <button class="modal-close" id="closeProductModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <form id="productForm">
          <input type="hidden" id="productId" name="id" />
          <div class="form-group">
            <label class="form-label">Product Name</label>
            <input type="text" class="form-input" id="productTitle" name="title" required />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-input" id="productDescription" name="description" rows="4" required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Price (£)</label>
            <input type="number" class="form-input" id="productPrice" name="price" step="0.01" min="0" required />
          </div>
          <div class="form-group">
            <label class="form-label">Badge (Optional)</label>
            <input type="text" class="form-input" id="productBadge" name="badge" placeholder="e.g. New, Sale, Popular" />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="cancelProductBtn">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div class="modal" id="categoryModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add Category</h2>
          <button class="modal-close" id="closeCategoryModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <form id="categoryForm">
          <div class="form-group">
            <label class="form-label">Category Name</label>
            <input type="text" class="form-input" id="categoryName" name="name" required />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="cancelCategoryBtn">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Category</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
