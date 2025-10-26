// Authentication Manager - API-backed version with proper data persistence
// Integrates with backend API for users, passwords, orders, and addresses

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
  orders?: string[]; // Order IDs (orders stored separately)
  addresses: Address[];
  isAdmin?: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  smsNotifications: boolean;
  emailNotifications: boolean;
  marketingEmails: boolean;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

class AuthManagerAPI {
  private currentUser: User | null = null;
  private readonly CURRENT_USER_KEY = 'bliss_current_user';
  private readonly SESSION_KEY = 'bliss_session';
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.init();
  }

  private async init(): Promise<void> {
    await this.createDefaultAdminAccount();
    this.loadCurrentUser();
  }

  async waitForInit(): Promise<void> {
    await this.initialized;
  }

  private async fetchJson(input: string, init?: RequestInit) {
    try {
      const res = await fetch(input, init);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.status === 204 ? null : res.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Create default admin account if it doesn't exist
  private async createDefaultAdminAccount(): Promise<void> {
    try {
      const users = await this.fetchJson(`${API_BASE}/users`) as User[];
      const adminEmail = 'maxine.croston@email.com';
      
      const existingAdmin = users.find(u => u.email === adminEmail);
      if (!existingAdmin) {
        const adminUser: User = {
          id: 'admin_001',
          email: adminEmail,
          name: 'Maxine Croston',
          phone: '+44 7XXX XXX XXX',
          createdAt: new Date().toISOString(),
          orders: [],
          addresses: [
            {
              id: 'addr_001',
              name: 'Home',
              street: '123 Salon Street',
              city: 'London',
              postalCode: 'SW1A 1AA',
              country: 'United Kingdom',
              isDefault: true
            }
          ],
          isAdmin: true,
          preferences: {
            smsNotifications: true,
            emailNotifications: true,
            marketingEmails: false
          }
        };
        
        // Save admin user to API
        await this.fetchJson(`${API_BASE}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminUser)
        });
        
        // Save admin password
        await this.fetchJson(`${API_BASE}/passwords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: adminUser.id, password: this.hashPassword('Password123') })
        });
        
        console.log('✅ Created default admin account');
      }
    } catch (error) {
      console.error('⚠️ Failed to create admin account:', error);
    }
  }

  // Simple hash function (in production, use proper bcrypt on server-side)
  private hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  // Register new user
  async register(email: string, password: string, name: string, phone?: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = await this.fetchJson(`${API_BASE}/users`) as User[];
      
      // Check if user already exists
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: 'Email already registered' };
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, message: 'Invalid email address' };
      }

      // Validate password strength
      if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' };
      }

      // Create new user
      const newUser: User = {
        id: this.generateId(),
        email: email.toLowerCase(),
        name,
        phone,
        createdAt: new Date().toISOString(),
        orders: [],
        addresses: [],
        preferences: {
          smsNotifications: false,
          emailNotifications: true,
          marketingEmails: false
        }
      };

      // Save user to API
      const created = await this.fetchJson(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      }) as User;

      // Save password to API
      await this.fetchJson(`${API_BASE}/passwords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: created.id, password: this.hashPassword(password) })
      });

      console.log('✅ User registered and saved to data/users.json');
      return { success: true, message: 'Registration successful!', user: created };
    } catch (error) {
      console.error('❌ Failed to register user:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }

  // Login user
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = await this.fetchJson(`${API_BASE}/users`) as User[];
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }

      // Check password
      const passwords = await this.fetchJson(`${API_BASE}/passwords`) as Record<string, string>;
      const hashedPassword = this.hashPassword(password);
      
      if (passwords[user.id] !== hashedPassword) {
        return { success: false, message: 'Invalid email or password' };
      }

      // Create session
      this.currentUser = user;
      this.saveSession(user);

      console.log('✅ User logged in:', user.email);
      return { success: true, message: 'Login successful!', user };
    } catch (error) {
      console.error('❌ Login failed:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  // Logout user
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem(this.SESSION_KEY);
    console.log('✅ User logged out');
  }

  // Get current logged-in user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null && this.isSessionValid();
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    try {
      const updated = await this.fetchJson(`${API_BASE}/users/${this.currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      }) as User;

      this.currentUser = updated;
      this.saveSession(this.currentUser);
      console.log('✅ Profile updated and saved to data/users.json');
      return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      return { success: false, message: 'Update failed. Please try again.' };
    }
  }

  // Update user preferences (SMS, email notifications)
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    const updatedPreferences: UserPreferences = {
      smsNotifications: preferences.smsNotifications ?? this.currentUser.preferences?.smsNotifications ?? false,
      emailNotifications: preferences.emailNotifications ?? this.currentUser.preferences?.emailNotifications ?? true,
      marketingEmails: preferences.marketingEmails ?? this.currentUser.preferences?.marketingEmails ?? false
    };

    return this.updateProfile({ preferences: updatedPreferences });
  }

  // Add/Update address
  async saveAddress(address: Omit<Address, 'id'>): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    const newAddress: Address = {
      id: this.generateId(),
      ...address
    };

    // If this is the default address, unset others
    let addresses = [...this.currentUser.addresses];
    if (newAddress.isDefault) {
      addresses.forEach(addr => addr.isDefault = false);
    }

    addresses.push(newAddress);
    const result = await this.updateProfile({ addresses });
    
    if (result.success) {
      console.log('✅ Address saved to data/users.json');
    }
    
    return result;
  }

  // Update existing address
  async updateAddress(addressId: string, updates: Partial<Address>): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    let addresses = [...this.currentUser.addresses];
    const index = addresses.findIndex(addr => addr.id === addressId);
    
    if (index === -1) {
      return { success: false, message: 'Address not found' };
    }

    // If setting as default, unset others
    if (updates.isDefault) {
      addresses.forEach(addr => addr.isDefault = false);
    }

    addresses[index] = { ...addresses[index], ...updates };
    return this.updateProfile({ addresses });
  }

  // Delete address
  async deleteAddress(addressId: string): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    const addresses = this.currentUser.addresses.filter(addr => addr.id !== addressId);
    const result = await this.updateProfile({ addresses });
    
    if (result.success) {
      console.log('✅ Address deleted from data/users.json');
    }
    
    return result;
  }

  // Get user's orders (fetches from orderManager)
  getUserOrders(): string[] {
    if (!this.currentUser) return [];
    return this.currentUser.orders || [];
  }

  // Link order to user (called after order creation)
  async addOrderToUser(orderId: string): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    const orders = [...(this.currentUser.orders || []), orderId];
    return this.updateProfile({ orders });
  }

  // Get all users (admin only - for linking bookings)
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.fetchJson(`${API_BASE}/users`) as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  // Add booking to user (for customer portal integration)
  async addBookingToUser(userId: string, bookingId: string): Promise<void> {
    try {
      const users = await this.getAllUsers();
      const user = users.find(u => u.id === userId);
      
      if (user) {
        const bookings = [...((user as any).bookings || []), bookingId];
        await this.fetchJson(`${API_BASE}/users/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...user, bookings })
        });
      }
    } catch (error) {
      console.error('Error adding booking to user:', error);
      throw error;
    }
  }

  // Private helper methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveSession(user: User): void {
    const session = {
      userId: user.id,
      timestamp: Date.now(),
      expiresIn: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  private loadCurrentUser(): void {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userJson && this.isSessionValid()) {
      this.currentUser = JSON.parse(userJson);
      if (this.currentUser) {
        console.log('✅ Session restored:', this.currentUser.email);
      }
    } else {
      this.logout();
    }
  }

  private isSessionValid(): boolean {
    const sessionJson = localStorage.getItem(this.SESSION_KEY);
    if (!sessionJson) return false;

    const session = JSON.parse(sessionJson);
    const now = Date.now();
    return now - session.timestamp < session.expiresIn;
  }
}

export const authManagerAPI = new AuthManagerAPI();
