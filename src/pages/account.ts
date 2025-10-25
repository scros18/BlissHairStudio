// User Account Page Template

export function accountPageTemplate(userName: string = '', isAdmin: boolean = false): string {
  return `
    <div class="account-page">
      <div class="container">
        <div class="account-header">
          <div class="account-header-content">
            <h1>Welcome back, ${userName.split(' ')[0] || 'User'}! ✨</h1>
            <p class="account-subtitle">Manage your beauty journey</p>
          </div>
          <div class="account-header-actions">
            ${isAdmin ? `
              <a href="/admin" class="btn btn-admin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                Admin Panel
              </a>
            ` : ''}
            <button class="btn btn-secondary" id="logoutBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>

        <div class="account-content">
          <!-- Sidebar Navigation -->
          <div class="account-sidebar">
            <nav class="account-nav">
              <a href="#" class="account-nav-item active" data-tab="profile">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Profile
              </a>
              <a href="#" class="account-nav-item" data-tab="orders">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 2L6 6H3L6 20H18L21 6H18L15 2M9 2H15M9 2V6M15 2V6"/>
                </svg>
                Orders
              </a>
              <a href="#" class="account-nav-item" data-tab="addresses">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Addresses
              </a>
              <a href="#" class="account-nav-item" data-tab="settings">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m6.36 6.36l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m6.36-6.36l4.24-4.24"/>
                </svg>
                Settings
              </a>
            </nav>
          </div>

          <!-- Main Content -->
          <div class="account-main">
            <!-- Profile Tab -->
            <div class="account-tab active" data-tab-content="profile">
              <div class="account-card">
                <h2>Profile Information</h2>
                <form class="account-form" id="profileForm">
                  <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" name="name" id="profileName" placeholder="Enter your full name">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" name="email" id="profileEmail" placeholder="your@email.com" readonly>
                    <small class="form-help">Email cannot be changed</small>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-input" name="phone" id="profilePhone" placeholder="+44 7XXX XXX XXX">
                  </div>
                  <button type="submit" class="btn btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Save Changes
                  </button>
                </form>
              </div>

              <div class="account-card">
                <h2>Change Password</h2>
                <form class="account-form" id="passwordForm">
                  <div class="form-group">
                    <label class="form-label">Current Password</label>
                    <input type="password" class="form-input" name="currentPassword">
                  </div>
                  <div class="form-group">
                    <label class="form-label">New Password</label>
                    <input type="password" class="form-input" name="newPassword">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Confirm New Password</label>
                    <input type="password" class="form-input" name="confirmPassword">
                  </div>
                  <button type="submit" class="btn btn-primary">Update Password</button>
                </form>
              </div>
            </div>

            <!-- Orders Tab -->
            <div class="account-tab" data-tab-content="orders">
              <div class="orders-list" id="ordersList">
                <div class="empty-state">
                  <h3>No Orders</h3>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Addresses Tab -->
            <div class="account-tab" data-tab-content="addresses">
              <div class="account-card">
                <h2>Saved Addresses</h2>
                <div class="addresses-grid" id="addressesGrid">
                  <div class="empty-state">
                    <h3>No Addresses</h3>
                    <p>Add an address to use for future orders</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Settings Tab -->
            <div class="account-tab" data-tab-content="settings">
              <div class="account-card">
                <h2>Account Settings</h2>
                <div class="settings-list">
                  <div class="setting-item">
                    <div>
                      <h3>Email Notifications</h3>
                      <p>Receive updates about your orders and new products</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" checked>
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                  <div class="setting-item">
                    <div>
                      <h3>SMS Notifications</h3>
                      <p>Get order updates via text message</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox">
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                  <div class="setting-item">
                    <div>
                      <h3>Marketing Emails</h3>
                      <p>Stay updated with exclusive offers and promotions</p>
                    </div>
                    <label class="toggle-switch">
                      <input type="checkbox" checked>
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="account-card danger-zone">
                <h2>Danger Zone</h2>
                <div class="danger-actions">
                  <div>
                    <h3>Delete Account</h3>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <button class="btn btn-danger">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to render orders
export function renderOrders(orders: any[]) {
  const ordersList = document.getElementById('ordersList');
  if (!ordersList) return;

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

  ordersList.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-header">
        <div class="order-info">
          <h4>Order #${order.id}</h4>
          <p>${new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
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
        <button class="btn-view-order" onclick="viewOrderDetails('${order.id}')">
          View Details
        </button>
      </div>
    </div>
  `).join('');
}

// Function to show order details modal
export function viewOrderDetails(orderId: string) {
  // This function will be called when View Details is clicked
  const modal = document.createElement('div');
  modal.className = 'order-detail-modal active';
  modal.innerHTML = `
    <div class="order-detail-content">
      <div class="order-detail-header">
        <h3>Order #${orderId}</h3>
        <button class="modal-close" onclick="this.closest('.order-detail-modal').remove()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="order-detail-body">
        <div class="order-detail-section">
          <h4>Order Items</h4>
          <!-- Items will be populated here -->
        </div>
        <div class="order-detail-section">
          <h4>Order Summary</h4>
          <div class="order-summary-row">
            <span>Subtotal:</span>
            <span>£0.00</span>
          </div>
          <div class="order-summary-row">
            <span>Shipping:</span>
            <span>£0.00</span>
          </div>
          <div class="order-summary-row total">
            <span>Total:</span>
            <span>£0.00</span>
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

// Make viewOrderDetails globally available
(window as any).viewOrderDetails = viewOrderDetails;

// Function to render addresses
export function renderAddresses(addresses: any[]) {
  const addressesGrid = document.getElementById('addressesGrid');
  if (!addressesGrid) return;

  if (addresses.length === 0) {
    addressesGrid.innerHTML = `
      <div class="empty-state">
        <h3>No Addresses</h3>
        <p>Add an address to use for future orders</p>
      </div>
      <button class="address-card add-address" onclick="showAddressModal()">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        <span>Add New Address</span>
      </button>
    `;
    return;
  }

  addressesGrid.innerHTML = addresses.map(address => `
    <div class="address-card" data-address-id="${address.id}">
      <div class="address-card-header">
        <h3>${address.name}</h3>
        ${address.isDefault ? '<span class="address-default-badge">DEFAULT</span>' : ''}
      </div>
      <p class="address-details">
        ${address.street}<br>
        ${address.city}, ${address.postalCode}<br>
        ${address.country}
      </p>
      <div class="address-actions">
        <button class="btn btn-secondary btn-sm" onclick="editAddress('${address.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>
        ${!address.isDefault ? `
          <button class="btn btn-secondary btn-sm" onclick="setDefaultAddress('${address.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Set Default
          </button>
        ` : ''}
        <button class="btn btn-danger btn-sm" onclick="deleteAddress('${address.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  `).join('') + `
    <button class="address-card add-address" onclick="showAddressModal()">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      <span>Add New Address</span>
    </button>
  `;
}

// Function to show address modal
export function showAddressModal(addressId?: string) {
  const isEdit = !!addressId;
  const modal = document.createElement('div');
  modal.className = 'address-modal active';
  modal.id = 'addressModal';
  
  modal.innerHTML = `
    <div class="address-modal-content">
      <div class="address-modal-header">
        <h3>${isEdit ? 'Edit Address' : 'Add New Address'}</h3>
        <button class="modal-close" onclick="document.getElementById('addressModal').remove()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="address-modal-body">
        <form class="address-form" id="addressForm" data-address-id="${addressId || ''}">
          <div class="form-group">
            <label class="form-label required">Address Name</label>
            <input type="text" class="form-input" name="name" placeholder="e.g., Home, Work, Office" required>
            <small class="form-help">Give this address a memorable name</small>
          </div>
          <div class="form-group">
            <label class="form-label required">Street Address</label>
            <input type="text" class="form-input" name="street" placeholder="123 Salon Street" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">City</label>
              <input type="text" class="form-input" name="city" placeholder="London" required>
            </div>
            <div class="form-group">
              <label class="form-label required">Postcode</label>
              <input type="text" class="form-input" name="postalCode" placeholder="SW1A 1AA" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label required">Country</label>
            <select class="form-input" name="country" required>
              <option value="">Select country</option>
              <option value="United Kingdom" selected>United Kingdom</option>
              <option value="Ireland">Ireland</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Spain">Spain</option>
              <option value="Italy">Italy</option>
            </select>
          </div>
          <div class="form-group">
            <label class="toggle-checkbox">
              <input type="checkbox" name="isDefault" ${isEdit ? '' : 'checked'}>
              <span>Set as default address</span>
            </label>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('addressModal').remove()">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              ${isEdit ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
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
  
  // If editing, populate form with existing address data
  if (isEdit && addressId) {
    // This will be handled by the account.ts initialization
    (window as any).populateAddressForm(addressId);
  }
}

// Make functions globally available
(window as any).showAddressModal = showAddressModal;
(window as any).editAddress = (id: string) => showAddressModal(id);
(window as any).deleteAddress = async (id: string) => {
  if (confirm('Are you sure you want to delete this address?')) {
    // Import authManagerAPI and call deleteAddress
    const { authManagerAPI } = await import('../utils/authManagerAPI');
    const result = await authManagerAPI.deleteAddress(id);
    if (result.success) {
      const user = authManagerAPI.getCurrentUser();
      if (user) {
        renderAddresses(user.addresses);
      }
    } else {
      alert('Failed to delete address: ' + result.message);
    }
  }
};
(window as any).setDefaultAddress = async (id: string) => {
  const { authManagerAPI } = await import('../utils/authManagerAPI');
  const user = authManagerAPI.getCurrentUser();
  if (!user) return;
  
  // Find the address and set it as default
  const address = user.addresses.find(a => a.id === id);
  if (address) {
    const result = await authManagerAPI.updateAddress(id, { ...address, isDefault: true });
    if (result.success) {
      const updatedUser = authManagerAPI.getCurrentUser();
      if (updatedUser) {
        renderAddresses(updatedUser.addresses);
      }
    } else {
      alert('Failed to set default address: ' + result.message);
    }
  }
};
