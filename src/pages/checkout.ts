// Checkout Page Template

import { cartManager } from '../utils/cartManager';
import { authManagerAPI } from '../utils/authManagerAPI';

export function checkoutPageTemplate(): string {
  const cart = cartManager.getCart();
  const user = authManagerAPI.getCurrentUser();
  const isLoggedIn = authManagerAPI.isLoggedIn();
  
  // Calculate shipping
  const subtotal = cart.total;
  const shipping = subtotal >= 50 ? 0 : 5.00;
  const total = subtotal + shipping;
  
  // Populate user data if logged in
  const userEmail = user?.email || '';
  const userName = user?.name || '';
  const userPhone = user?.phone || '';
  const [firstName, ...lastNameParts] = userName.split(' ');
  const lastName = lastNameParts.join(' ');
  
  return `
    <div class="checkout-page">
      <div class="container checkout-container">
        <div class="checkout-header">
          <h1>Secure Checkout</h1>
          <p>Complete your order with confidence</p>
          ${!isLoggedIn ? `
            <div class="checkout-login-prompt">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Already have an account? <a href="/login" class="checkout-login-link">Sign in</a> for faster checkout</span>
            </div>
          ` : `
            <div class="checkout-user-info">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Logged in as <strong>${userName}</strong></span>
            </div>
          `}
        </div>
        
        <div class="checkout-content">
          <div class="checkout-main">
            <!-- Step Indicator -->
            <div class="checkout-steps">
              <div class="step active" data-step="1">
                <div class="step-number">1</div>
                <span>Shipping</span>
              </div>
              <div class="step-line"></div>
              <div class="step" data-step="2">
                <div class="step-number">2</div>
                <span>Payment</span>
              </div>
              <div class="step-line"></div>
              <div class="step" data-step="3">
                <div class="step-number">3</div>
                <span>Review</span>
              </div>
            </div>

            <!-- Checkout Form -->
            <form class="checkout-form" id="checkoutForm">
              <!-- Step 1: Shipping Information -->
              <div class="form-section" data-section="1">
                <h2>Shipping Information</h2>
                
                ${isLoggedIn && user?.addresses && user.addresses.length > 0 ? `
                  <div class="saved-addresses-section">
                    <h3 style="font-size: 1rem; font-weight: 600; color: #374151; margin-bottom: 16px;">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 8px;">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      Use Saved Address
                    </h3>
                    <div class="saved-addresses-list">
                      ${user.addresses.map(address => `
                        <label class="saved-address-option ${address.isDefault ? 'default' : ''}">
                          <input type="radio" name="savedAddress" value="${address.id}" ${address.isDefault ? 'checked' : ''}>
                          <div class="saved-address-content">
                            <div class="saved-address-header">
                              <strong>${address.name}</strong>
                              ${address.isDefault ? '<span class="address-badge">Default</span>' : ''}
                            </div>
                            <p class="saved-address-details">
                              ${address.street}, ${address.city}, ${address.postalCode}, ${address.country}
                            </p>
                          </div>
                        </label>
                      `).join('')}
                      <label class="saved-address-option">
                        <input type="radio" name="savedAddress" value="new">
                        <div class="saved-address-content">
                          <div class="saved-address-header">
                            <strong>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 4px;">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                              </svg>
                              Use New Address
                            </strong>
                          </div>
                          <p class="saved-address-details">Enter a different shipping address</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div class="form-divider" style="margin: 28px 0; border-top: 1px solid #E5E7EB;"></div>
                ` : ''}
                
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label required">First Name</label>
                    <input type="text" class="form-input" name="firstName" value="${firstName}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Last Name</label>
                    <input type="text" class="form-input" name="lastName" value="${lastName}" required>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label required">Email Address</label>
                  <input type="email" class="form-input" name="email" value="${userEmail}" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">Phone Number</label>
                  <input type="tel" class="form-input" name="phone" value="${userPhone}" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">Street Address</label>
                  <input type="text" class="form-input" name="address" required>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label required">City</label>
                    <input type="text" class="form-input" name="city" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Postcode</label>
                    <input type="text" class="form-input" name="postcode" required>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Delivery Notes (Optional)</label>
                  <textarea class="form-input" name="notes" rows="3" placeholder="Any special delivery instructions..."></textarea>
                </div>
                ${isLoggedIn ? `
                  <div class="form-group">
                    <label class="toggle-checkbox-inline">
                      <input type="checkbox" name="saveAddress" id="saveAddressCheckbox">
                      <span>Save this address for future orders</span>
                    </label>
                  </div>
                ` : ''}
                <div class="form-actions">
                  <button type="button" class="btn btn-secondary" onclick="history.back()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                    Back to Cart
                  </button>
                  <button type="button" class="btn btn-primary btn-lg" id="continueToPayment">
                    Continue to Payment
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Step 2: Payment Method -->
              <div class="form-section hidden" data-section="2">
                <h2>Payment Method</h2>
                <div class="payment-methods">
                  <label class="payment-method-option">
                    <input type="radio" name="paymentMethod" value="card" checked>
                    <div class="payment-method-content">
                      <div class="payment-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                          <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                      </div>
                      <div class="payment-details">
                        <span class="payment-title">Credit / Debit Card</span>
                        <span class="payment-subtitle">Visa, Mastercard, Amex</span>
                      </div>
                      <div class="card-logos">
                        <svg width="40" height="25" viewBox="0 0 48 32"><rect width="48" height="32" rx="4" fill="#1434CB"/><circle cx="18" cy="16" r="8" fill="#EB001B" opacity="0.8"/><circle cx="30" cy="16" r="8" fill="#FF5F00" opacity="0.8"/></svg>
                        <svg width="40" height="25" viewBox="0 0 48 32"><rect width="48" height="32" rx="4" fill="#0066B2"/><rect x="30" y="10" width="12" height="12" fill="#FFB600"/></svg>
                      </div>
                    </div>
                  </label>
                  
                  <label class="payment-method-option">
                    <input type="radio" name="paymentMethod" value="paypal">
                    <div class="payment-method-content">
                      <div class="payment-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#003087">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.632h7.894a4.8 4.8 0 0 1 4.8 4.8c0 4.8-3.914 8.714-8.714 8.714h-1.89l-.937 4.735z"/>
                          <path d="M18.826 7.584c-.897 5.56-4.643 7.752-9.007 7.752h-.54l-1.166 5.88c-.053.267.14.51.41.51h3.23c.297 0 .55-.22.595-.516l.025-.13.486-2.45.03-.164c.044-.297.298-.517.595-.517h.374c3.853 0 6.87-1.57 7.75-6.11.368-1.897.177-3.48-.783-4.58-.29-.333-.654-.61-1.078-.827z" fill="#0070E0"/>
                        </svg>
                      </div>
                      <div class="payment-details">
                        <span class="payment-title">PayPal</span>
                        <span class="payment-subtitle">Fast & Secure</span>
                      </div>
                    </div>
                  </label>
                </div>
                
                <div class="card-details" id="cardDetails">
                  <div class="form-group">
                    <label class="form-label required">Card Number</label>
                    <div class="input-with-icon">
                      <input type="text" class="form-input" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" id="cardNumberInput" required>
                      <div class="card-brand-icon" id="cardBrandIcon"></div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label required">Expiry Date</label>
                      <input type="text" class="form-input" name="cardExpiry" placeholder="MM / YY" maxlength="7" id="cardExpiryInput" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label required">CVV</label>
                      <div class="input-with-icon">
                        <input type="text" class="form-input" name="cardCvv" placeholder="123" maxlength="4" id="cardCvvInput" required>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity: 0.4;">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 16v-4M12 8h.01"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Cardholder Name</label>
                    <input type="text" class="form-input" name="cardName" placeholder="Name on card" required>
                  </div>
                </div>
                
                <div class="paypal-details hidden" id="paypalDetails">
                  <div class="paypal-info">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#003087" stroke-width="1.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <p>You'll be redirected to PayPal to complete your purchase securely.</p>
                  </div>
                </div>
                
                <div class="form-actions">
                  <button type="button" class="btn btn-secondary" id="backToShipping">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                    Back
                  </button>
                  <button type="button" class="btn btn-primary btn-lg" id="continueToReview">
                    Review Order
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Step 3: Review Order -->
              <div class="form-section hidden" data-section="3">
                <h2>Review Your Order</h2>
                <div class="order-review" id="orderReview"></div>
                <div class="form-actions">
                  <button type="button" class="btn btn-secondary" id="backToPayment">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                    Back
                  </button>
                  <button type="submit" class="btn btn-primary btn-lg" id="placeOrderBtn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    Place Order £${total.toFixed(2)}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="checkout-sidebar">
            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="order-items" id="checkoutOrderItems">
                ${cart.items.length === 0 ? `
                  <div class="empty-cart-message">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <p>Your cart is empty</p>
                    <a href="/products" class="btn btn-secondary btn-sm">Continue Shopping</a>
                  </div>
                ` : cart.items.map(item => `
                  <div class="order-item-summary">
                    <div class="order-item-image" style="background-image: url('${item.product.image || '/logo.webp'}')"></div>
                    <div class="order-item-details">
                      <h4>${item.product.title}</h4>
                      ${item.selectedSize ? `<p class="item-size">Size: ${item.selectedSize}</p>` : ''}
                      <p>Qty: ${item.quantity}</p>
                    </div>
                    <div class="order-item-price">£${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                `).join('')}
              </div>
              <div class="order-totals">
                <div class="order-total-row">
                  <span>Subtotal</span>
                  <span id="orderSubtotal">£${subtotal.toFixed(2)}</span>
                </div>
                <div class="order-total-row">
                  <span>Shipping</span>
                  <span id="orderShipping">${shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                </div>
                ${subtotal < 50 && subtotal > 0 ? `
                  <div class="free-shipping-notice">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    <span>Add £${(50 - subtotal).toFixed(2)} more for FREE shipping!</span>
                  </div>
                ` : ''}
                <div class="order-total-row total">
                  <strong>Total</strong>
                  <strong id="orderTotal">£${total.toFixed(2)}</strong>
                </div>
              </div>
              <div class="security-badges">
                <div class="security-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div class="security-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

