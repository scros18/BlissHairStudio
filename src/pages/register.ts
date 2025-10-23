// Register Page Template

export function registerPageTemplate(): string {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
            </div>
            <h1>Create Account</h1>
            <p>Join BlissHairStudio and start your beauty journey</p>
          </div>

          <form id="registerForm" class="auth-form">
            <div class="form-group">
              <label for="registerName">Full Name</label>
              <input 
                type="text" 
                id="registerName" 
                name="name" 
                required
                placeholder="Enter your full name"
                autocomplete="name"
              >
            </div>

            <div class="form-group">
              <label for="registerEmail">Email Address</label>
              <input 
                type="email" 
                id="registerEmail" 
                name="email" 
                required
                placeholder="your@email.com"
                autocomplete="email"
              >
            </div>

            <div class="form-group">
              <label for="registerPhone">Phone Number (Optional)</label>
              <input 
                type="tel" 
                id="registerPhone" 
                name="phone" 
                placeholder="+44 7XXX XXXXXX"
                autocomplete="tel"
              >
            </div>

            <div class="form-group">
              <label for="registerPassword">Password</label>
              <input 
                type="password" 
                id="registerPassword" 
                name="password" 
                required
                placeholder="At least 6 characters"
                autocomplete="new-password"
                minlength="6"
              >
              <div class="password-strength" id="passwordStrength"></div>
            </div>

            <div class="form-group">
              <label for="registerConfirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="registerConfirmPassword" 
                name="confirmPassword" 
                required
                placeholder="Re-enter your password"
                autocomplete="new-password"
              >
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" name="terms" required>
                <span>I agree to the <a href="/terms" class="auth-link">Terms & Conditions</a></span>
              </label>
            </div>

            <button type="submit" class="auth-btn auth-btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              Create Account
            </button>
          </form>

          <div class="auth-divider">
            <span>or</span>
          </div>

          <div class="auth-footer">
            <p>Already have an account? <a href="/login" class="auth-link">Sign in here</a></p>
          </div>
        </div>

        <div class="auth-benefits">
          <h3>What You'll Get</h3>
          <div class="benefit-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/>
            </svg>
            <div>
              <h4>10% Off First Order</h4>
              <p>Welcome gift for new members</p>
            </div>
          </div>
          <div class="benefit-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div>
              <h4>Priority Booking</h4>
              <p>Get early access to appointments</p>
            </div>
          </div>
          <div class="benefit-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            <div>
              <h4>Exclusive Offers</h4>
              <p>Member-only deals and promotions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
