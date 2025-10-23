// Admin Login Page Template
export const adminLoginTemplate = (): string => {
  return `
    <section class="admin-login">
        <div class="container">
            <div class="admin-login-card">
                <div class="admin-login-header">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    <h1>Admin Login</h1>
                    <p>Welcome back to BlissHairStudio Admin Panel</p>
                </div>
                
                <form id="adminLoginForm" class="admin-login-form">
                    <div class="form-group">
                        <label for="email" class="form-label">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            class="form-control" 
                            placeholder="admin@blisshairstudio.com" 
                            required
                            autocomplete="email"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            class="form-control" 
                            placeholder="Enter your password" 
                            required
                            autocomplete="current-password"
                        >
                    </div>
                    
                    <div class="form-group form-remember">
                        <label class="checkbox-label">
                            <input type="checkbox" name="remember" id="remember">
                            <span>Remember me</span>
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
                        </svg>
                        <span>Sign In</span>
                    </button>
                    
                    <div class="admin-login-hint">
                        <p><strong>Default Login:</strong></p>
                        <p>Email: maxine.croston@email.com</p>
                        <p>Password: Password123</p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  `;
};
