// Authentication Module

import { storage } from './storage';
import type { AuthState, User } from './types';

const ADMIN_EMAIL = 'maxine.croston@email.com';
const ADMIN_PASSWORD = 'Password123';
const AUTH_KEY = 'auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

class AuthManager {
  private state: AuthState = {
    isAuthenticated: false,
    user: null
  };

  constructor() {
    this.restoreSession();
  }

  private restoreSession(): void {
    const session = storage.get<{ user: User; timestamp: number }>(AUTH_KEY, true);
    
    if (session && session.timestamp) {
      const now = Date.now();
      if (now - session.timestamp < SESSION_DURATION) {
        this.state = {
          isAuthenticated: true,
          user: session.user
        };
      } else {
        this.logout();
      }
    }
  }

  login(email: string, password: string, remember: boolean = false): boolean {
    // Simple validation - in production, this would be server-side
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user: User = {
        email: ADMIN_EMAIL,
        role: 'admin'
      };
      
      this.state = {
        isAuthenticated: true,
        user
      };
      
      storage.set(AUTH_KEY, {
        user,
        timestamp: Date.now(),
        remember
      }, true);
      
      return true;
    }
    
    return false;
  }

  logout(): void {
    this.state = {
      isAuthenticated: false,
      user: null
    };
    storage.remove(AUTH_KEY);
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.state.user;
  }

  getUser(): User | null {
    return this.state.user;
  }

  requireAuth(callback: () => void): void {
    if (this.isAuthenticated()) {
      callback();
    } else {
      // Router will handle navigation
      console.log('Authentication required');
    }
  }
}

export const authManager = new AuthManager();
export const auth = authManager; // Keep for backward compatibility
