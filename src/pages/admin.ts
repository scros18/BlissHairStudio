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
        <button class="admin-tab" data-section="orders">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 2L6 6H3L6 20H18L21 6H18L15 2M9 2H15M9 2V6M15 2V6"/>
          </svg>
          <span>Orders</span>
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
        <button class="admin-tab" data-section="users">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Users</span>
        </button>
        <button class="admin-tab" data-section="data">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
            <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/>
          </svg>
          <span>Data</span>
        </button>
        <button class="admin-tab" data-section="bookings">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>Calendar</span>
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

        <!-- Orders Section -->
        <div class="admin-section" data-section-content="orders">
          <h2 class="admin-section-title">Customer Orders</h2>
          <div class="admin-section-header">
            <div class="admin-stats">
              <div class="admin-stat-card">
                <div class="stat-label">Total Orders</div>
                <div class="stat-value" id="totalOrders">0</div>
              </div>
              <div class="admin-stat-card">
                <div class="stat-label">Pending</div>
                <div class="stat-value" id="pendingOrders">0</div>
              </div>
              <div class="admin-stat-card">
                <div class="stat-label">Completed</div>
                <div class="stat-value" id="completedOrders">0</div>
              </div>
            </div>
          </div>

          <div class="admin-content">
            <div class="orders-list" id="adminOrdersList">
              <!-- Orders will be loaded here -->
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

        <!-- Users Section -->
        <div class="admin-section" data-section-content="users">
          <h2 class="admin-section-title">Users</h2>
          <div class="admin-content">
            <div id="usersList" class="users-list"></div>
          </div>
        </div>

        <!-- Data Section -->
        <div class="admin-section" data-section-content="data">
          <h2 class="admin-section-title">Data Export</h2>
          <div class="admin-content">
            <p>Download a snapshot of products, categories, orders, users, and bookings (passwords excluded).</p>
            <button class="btn btn-add-large" id="downloadDataBtn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download Data Bundle</span>
            </button>
            <a id="dataDownloadLink" style="display:none"></a>
          </div>
        </div>

        <!-- Bookings/Calendar Section -->
        <div class="admin-section" data-section-content="bookings">
          <h2 class="admin-section-title">Appointment Calendar</h2>
          
          <!-- Calendar Navigation -->
          <div class="calendar-nav">
            <a class="btn btn-add-large secondary" href="/admin/calendar" style="margin-right:auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Open Full Calendar</span>
            </a>
            <button class="btn btn-calendar-nav" id="prevWeekBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Previous Week
            </button>
            <div class="calendar-week-display">
              <h3 id="currentWeekDisplay">Oct 21 - Oct 27, 2025</h3>
              <button class="btn btn-today" id="todayBtn">Today</button>
            </div>
            <button class="btn btn-calendar-nav" id="nextWeekBtn">
              Next Week
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          <!-- Add Booking Button -->
          <div class="admin-section-header">
            <button class="btn btn-add-large" id="addBookingBtn" title="Book a new appointment">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>Book Appointment</span>
            </button>
          </div>

          <!-- Week View Calendar -->
          <div class="calendar-week-view" id="calendarWeekView">
            <!-- Calendar will be rendered here -->
          </div>

          <!-- Upcoming Appointments -->
          <div class="upcoming-section">
            <h3 class="upcoming-title">Upcoming Appointments (Next 7 Days)</h3>
            <div class="upcoming-list" id="upcomingList">
              <!-- Upcoming bookings will be loaded here -->
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

    <!-- Order Details Modal -->
    <div class="modal" id="orderModal">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h2 id="orderModalTitle">Order Details</h2>
          <button class="modal-close" id="closeOrderModal" title="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body" id="orderModalBody">
          <!-- Order details will be loaded here -->
        </div>
      </div>
    </div>

    <!-- Add/Edit Booking Modal -->
    <div class="modal" id="bookingModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="bookingModalTitle">Book New Appointment</h2>
          <button class="modal-close" id="closeBookingModal" title="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <form id="bookingForm">
          <input type="hidden" id="bookingId" name="id" />
          
          <div class="form-group">
            <label class="form-label">
              <span>Customer Name</span>
              <span class="form-required">*</span>
            </label>
            <input 
              type="text" 
              class="form-input form-input-large" 
              id="bookingCustomerName" 
              name="customerName" 
              placeholder="e.g., Sarah Johnson"
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Phone Number</span>
              <span class="form-required">*</span>
            </label>
            <input 
              type="tel" 
              class="form-input form-input-large" 
              id="bookingCustomerPhone" 
              name="customerPhone" 
              placeholder="e.g., 07XXX XXXXXX"
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Email</span>
              <span class="form-optional">(Optional)</span>
            </label>
            <input 
              type="email" 
              class="form-input form-input-large" 
              id="bookingCustomerEmail" 
              name="customerEmail" 
              placeholder="e.g., sarah@example.com"
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Service</span>
              <span class="form-required">*</span>
            </label>
            <select 
              class="form-input form-input-large" 
              id="bookingService" 
              name="service"
              required
            >
              <option value="">Select a service...</option>
              <option value="Haircut">Haircut</option>
              <option value="Haircut & Blow Dry">Haircut & Blow Dry</option>
              <option value="Blow Dry">Blow Dry</option>
              <option value="Hair Styling">Hair Styling</option>
              <option value="Hair Color">Hair Color</option>
              <option value="Highlights">Highlights</option>
              <option value="Balayage">Balayage</option>
              <option value="Perm">Perm</option>
              <option value="Hair Treatment">Hair Treatment</option>
              <option value="Keratin Treatment">Keratin Treatment</option>
              <option value="Updo">Updo</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                <span>Date</span>
                <span class="form-required">*</span>
              </label>
              <input 
                type="date" 
                class="form-input form-input-large" 
                id="bookingDate" 
                name="date" 
                required 
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <span>Time</span>
                <span class="form-required">*</span>
              </label>
              <select 
                class="form-input form-input-large" 
                id="bookingTime" 
                name="time"
                required
              >
                <option value="">Select time...</option>
                <!-- Time slots will be populated by JavaScript -->
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Duration</span>
              <span class="form-required">*</span>
            </label>
            <select 
              class="form-input form-input-large" 
              id="bookingDuration" 
              name="duration"
              required
            >
              <option value="30">30 minutes</option>
              <option value="60" selected>1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="150">2.5 hours</option>
              <option value="180">3 hours</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Notes</span>
              <span class="form-optional">(Optional)</span>
            </label>
            <textarea 
              class="form-input form-textarea form-input-large" 
              id="bookingNotes" 
              name="notes" 
              rows="3" 
              placeholder="Any special requests or notes..."
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span>Status</span>
            </label>
            <select 
              class="form-input form-input-large" 
              id="bookingStatus" 
              name="status"
            >
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-cancel" id="cancelBookingBtn">
              Cancel
            </button>
            <button type="button" class="btn btn-delete" id="deleteBookingBtn" style="display: none;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              <span>Delete</span>
            </button>
            <button type="submit" class="btn btn-save">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Save Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

