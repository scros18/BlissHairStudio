// Login Page Template

export function loginPageTemplate(): string {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="4"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              </svg>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to your BlissHairStudio account</p>
          </div>

          <form id="loginForm" class="auth-form">
            <div class="form-group">
              <label for="loginEmail">Email Address</label>
              <input 
                type="email" 
                id="loginEmail" 
                name="email" 
                required
                placeholder="your@email.com"
                autocomplete="email"
              >
            </div>

            <div class="form-group">
              <label for="loginPassword">Password</label>
              <input 
                type="password" 
                id="loginPassword" 
                name="password" 
                required
                placeholder="Enter your password"
                autocomplete="current-password"
              >
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" name="remember">
                <span>Remember me</span>
              </label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" class="auth-btn auth-btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
              </svg>
              Sign In
            </button>
          </form>

          <div class="auth-divider">
            <span>or</span>
          </div>

          <div class="auth-footer">
            <p>Don't have an account? <a href="/register" class="auth-link">Create one now</a></p>
          </div>
        </div>

        <div class="auth-benefits">
          <h3>Why Join BlissHairStudio?</h3>
          <div class="benefit-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/>
            </svg>
            <div>
              <h4>Exclusive Rewards</h4>
              <p>Earn points with every purchase</p>
            </div>
          </div>
          <div class="benefit-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <h4>Track Your Orders</h4>
              <p>Stay updated on your delivery status</p>
            </div>
          </div>
          <div class="benefit-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <div>
              <h4>Secure & Private</h4>
              <p>Your data is safe with us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
