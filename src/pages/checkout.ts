// Checkout Page Template

export function checkoutPageTemplate(): string {
  return `
    <div class="checkout-page">
      <div class="container checkout-container">
        <div class="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order securely</p>
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

            <!-- Shipping Form -->
            <form class="checkout-form" id="checkoutForm">
              <div class="form-section" data-section="1">
                <h2>Shipping Information</h2>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label required">First Name</label>
                    <input type="text" class="form-input" name="firstName" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label required">Last Name</label>
                    <input type="text" class="form-input" name="lastName" required>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label required">Email Address</label>
                  <input type="email" class="form-input" name="email" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">Phone Number</label>
                  <input type="tel" class="form-input" name="phone" required>
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
                <div class="form-actions">
                  <button type="button" class="btn btn-primary btn-lg" id="continueToPayment">
                    Continue to Payment
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="form-section hidden" data-section="2">
                <h2>Payment Method</h2>
                <div class="payment-methods">
                  <label class="payment-method-option">
                    <input type="radio" name="paymentMethod" value="card" checked>
                    <div class="payment-method-content">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      <span>Credit/Debit Card</span>
                    </div>
                  </label>
                  <label class="payment-method-option">
                    <input type="radio" name="paymentMethod" value="paypal">
                    <div class="payment-method-content">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.632h7.894a4.8 4.8 0 0 1 4.8 4.8c0 4.8-3.914 8.714-8.714 8.714h-1.89l-.937 4.735z"/>
                      </svg>
                      <span>PayPal</span>
                    </div>
                  </label>
                </div>
                <div class="card-details" id="cardDetails">
                  <div class="form-group">
                    <label class="form-label required">Card Number</label>
                    <input type="text" class="form-input" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label required">Expiry Date</label>
                      <input type="text" class="form-input" name="cardExpiry" placeholder="MM/YY" maxlength="5">
                    </div>
                    <div class="form-group">
                      <label class="form-label required">CVV</label>
                      <input type="text" class="form-input" name="cardCvv" placeholder="123" maxlength="3">
                    </div>
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
                  <button type="submit" class="btn btn-primary btn-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="checkout-sidebar">
            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="order-items" id="checkoutOrderItems"></div>
              <div class="order-totals">
                <div class="order-total-row">
                  <span>Subtotal</span>
                  <span id="orderSubtotal">£0.00</span>
                </div>
                <div class="order-total-row">
                  <span>Shipping</span>
                  <span id="orderShipping">£5.00</span>
                </div>
                <div class="order-total-row total">
                  <strong>Total</strong>
                  <strong id="orderTotal">£5.00</strong>
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
