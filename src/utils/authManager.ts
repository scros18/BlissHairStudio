// Authentication Manager with Local Storage
// For production, this should use a proper backend with encryption

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
  orders: Order[];
  addresses: Address[];
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shippingAddress: Address;
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

class AuthManager {
  private currentUser: User | null = null;
  private readonly USERS_KEY = 'bliss_users';
  private readonly CURRENT_USER_KEY = 'bliss_current_user';
  private readonly SESSION_KEY = 'bliss_session';

  constructor() {
    this.initStorage();
    this.createDefaultAdminAccount();
    this.loadCurrentUser();
  }

  // Create default admin account if it doesn't exist
  private createDefaultAdminAccount(): void {
    const users = this.getUsers();
    const adminEmail = 'maxine.croston@email.com';
    
    // Check if admin account already exists
    const existingAdmin = users.find(u => u.email === adminEmail);
    if (!existingAdmin) {
      const adminUser: User = {
        id: 'admin_001',
        email: adminEmail,
        name: 'Maxine Croston',
        phone: '+44 7XXX XXX XXX',
        createdAt: new Date().toISOString(),
        orders: [
          {
            id: 'ORD-2024-001',
            date: new Date('2024-10-15').toISOString(),
            items: [
              {
                productId: 'prod_001',
                name: 'Luxury Hair Care Kit',
                quantity: 1,
                price: 49.99
              },
              {
                productId: 'prod_002',
                name: 'Premium Hair Serum',
                quantity: 2,
                price: 24.99
              }
            ],
            total: 104.97,
            status: 'completed',
            shippingAddress: {
              id: 'addr_001',
              name: 'Home',
              street: '123 Salon Street',
              city: 'London',
              postalCode: 'SW1A 1AA',
              country: 'United Kingdom',
              isDefault: true
            }
          }
        ],
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
        isAdmin: true
      };
      
      // Add admin password
      const passwords = this.getPasswords();
      passwords[adminUser.id] = this.hashPassword('Password123');
      this.savePasswords(passwords);
      
      // Save admin user
      users.push(adminUser);
      this.saveUsers(users);
    } else if (!existingAdmin.isAdmin) {
      // Update existing account to be admin and add sample data if missing
      existingAdmin.isAdmin = true;
      if (!existingAdmin.orders || existingAdmin.orders.length === 0) {
        existingAdmin.orders = [
          {
            id: 'ORD-2024-001',
            date: new Date('2024-10-15').toISOString(),
            items: [
              {
                productId: 'prod_001',
                name: 'Luxury Hair Care Kit',
                quantity: 1,
                price: 49.99
              }
            ],
            total: 54.99,
            status: 'completed',
            shippingAddress: {
              id: 'addr_001',
              name: 'Home',
              street: '123 Salon Street',
              city: 'London',
              postalCode: 'SW1A 1AA',
              country: 'United Kingdom',
              isDefault: true
            }
          }
        ];
      }
      this.saveUsers(users);
    }
  }

  // Initialize users storage if it doesn't exist
  private initStorage(): void {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
    }
  }

  // Get all users (for admin purposes only - in production, this should be server-side)
  private getUsers(): User[] {
    this.initStorage();
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  // Save users to storage
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Simple hash function (in production, use proper bcrypt on server-side)
  private hashPassword(password: string): string {
    // This is a simple hash for demo purposes
    // In production, use bcrypt on the server
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  // Register new user
  register(email: string, password: string, name: string, phone?: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    
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
      addresses: []
    };

    // Store password separately (hashed)
    const passwords = this.getPasswords();
    passwords[newUser.id] = this.hashPassword(password);
    this.savePasswords(passwords);

    // Save user
    users.push(newUser);
    this.saveUsers(users);

    return { success: true, message: 'Registration successful!', user: newUser };
  }

  // Login user
  login(email: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Check password
    const passwords = this.getPasswords();
    const hashedPassword = this.hashPassword(password);
    
    if (passwords[user.id] !== hashedPassword) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Create session
    this.currentUser = user;
    this.saveSession(user);

    return { success: true, message: 'Login successful!', user };
  }

  // Logout user
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem(this.SESSION_KEY);
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
  updateProfile(updates: Partial<User>): { success: boolean; message: string } {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === this.currentUser!.id);

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    // Update user
    users[userIndex] = { ...users[userIndex], ...updates, id: this.currentUser.id };
    this.saveUsers(users);
    this.currentUser = users[userIndex];
    this.saveSession(this.currentUser);

    return { success: true, message: 'Profile updated successfully' };
  }

  // Add order to user
  addOrder(order: Omit<Order, 'id' | 'date'>): { success: boolean; message: string } {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    const newOrder: Order = {
      id: this.generateId(),
      date: new Date().toISOString(),
      ...order
    };

    this.currentUser.orders.unshift(newOrder);
    return this.updateProfile({ orders: this.currentUser.orders });
  }

  // Add/Update address
  saveAddress(address: Omit<Address, 'id'>): { success: boolean; message: string } {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    const newAddress: Address = {
      id: this.generateId(),
      ...address
    };

    // If this is the default address, unset others
    if (newAddress.isDefault) {
      this.currentUser.addresses.forEach(addr => addr.isDefault = false);
    }

    this.currentUser.addresses.push(newAddress);
    return this.updateProfile({ addresses: this.currentUser.addresses });
  }

  // Delete address
  deleteAddress(addressId: string): { success: boolean; message: string } {
    if (!this.currentUser) {
      return { success: false, message: 'Not logged in' };
    }

    this.currentUser.addresses = this.currentUser.addresses.filter(addr => addr.id !== addressId);
    return this.updateProfile({ addresses: this.currentUser.addresses });
  }

  // Private helper methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getPasswords(): Record<string, string> {
    const passwordsJson = localStorage.getItem('bliss_passwords');
    return passwordsJson ? JSON.parse(passwordsJson) : {};
  }

  private savePasswords(passwords: Record<string, string>): void {
    localStorage.setItem('bliss_passwords', JSON.stringify(passwords));
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

export const authManager = new AuthManager();
