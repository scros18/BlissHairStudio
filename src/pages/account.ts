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
              <div class="account-card">
                <h2>Order History</h2>
                <div class="orders-list" id="ordersList">
                  <div class="order-card">
                    <div class="order-card-header">
                      <div>
                        <h3>Order #12345</h3>
                        <p class="order-date">Placed on March 15, 2024</p>
                      </div>
                      <span class="order-status-badge delivered">Delivered</span>
                    </div>
                    <div class="order-items-preview">
                      <div class="order-item-mini">
                        <div class="order-item-image"></div>
                        <div class="order-item-info">
                          <p class="order-item-name">Luxury Hair Care Kit</p>
                          <p class="order-item-qty">Qty: 1</p>
                        </div>
                        <p class="order-item-price">£49.99</p>
                      </div>
                    </div>
                    <div class="order-card-footer">
                      <div class="order-total">Total: <strong>£54.99</strong></div>
                      <div class="order-actions">
                        <button class="btn btn-secondary btn-sm">View Details</button>
                        <button class="btn btn-primary btn-sm">Reorder</button>
                      </div>
                    </div>
                  </div>
                  <div class="empty-state" style="display: none;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <h3>No orders yet</h3>
                    <p>Start shopping to see your orders here</p>
                    <a href="/products" class="btn btn-primary">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Addresses Tab -->
            <div class="account-tab" data-tab-content="addresses">
              <div class="account-card">
                <h2>Saved Addresses</h2>
                <div class="addresses-grid">
                  <div class="address-card">
                    <div class="address-card-header">
                      <h3>Home</h3>
                      <span class="address-default-badge">Default</span>
                    </div>
                    <p class="address-details">
                      John Doe<br>
                      123 Main Street<br>
                      London, SW1A 1AA<br>
                      United Kingdom<br>
                      +44 123 456 7890
                    </p>
                    <div class="address-actions">
                      <button class="btn btn-secondary btn-sm">Edit</button>
                      <button class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </div>
                  <button class="address-card add-address">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span>Add New Address</span>
                  </button>
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
