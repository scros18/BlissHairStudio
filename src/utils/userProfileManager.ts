// User Profile Management

import type { SavedAddress, UserSettings, UserProfile } from './types';

class UserProfileManager {
  private readonly PROFILES_KEY = 'bliss_user_profiles';

  /**
   * Get user profile
   */
  getProfile(userEmail: string): UserProfile | null {
    try {
      const profiles = this.getAllProfiles();
      return profiles[userEmail] || null;
    } catch {
      return null;
    }
  }

  /**
   * Get all profiles
   */
  private getAllProfiles(): Record<string, UserProfile> {
    try {
      const data = localStorage.getItem(this.PROFILES_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  /**
   * Save all profiles
   */
  private saveAllProfiles(profiles: Record<string, UserProfile>): void {
    localStorage.setItem(this.PROFILES_KEY, JSON.stringify(profiles));
  }

  /**
   * Create or update profile
   */
  createOrUpdateProfile(userEmail: string, data: Partial<UserProfile>): UserProfile {
    const profiles = this.getAllProfiles();
    const existing = profiles[userEmail];

    const profile: UserProfile = {
      name: data.name || existing?.name || '',
      email: userEmail,
      phone: data.phone || existing?.phone || '',
      addresses: data.addresses || existing?.addresses || [],
      settings: data.settings || existing?.settings || {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true
      },
      orders: data.orders || existing?.orders || [],
      createdAt: existing?.createdAt || Date.now()
    };

    profiles[userEmail] = profile;
    this.saveAllProfiles(profiles);

    return profile;
  }

  /**
   * Update profile field
   */
  updateProfile(userEmail: string, updates: Partial<UserProfile>): boolean {
    const profiles = this.getAllProfiles();
    const existing = profiles[userEmail];

    if (!existing) return false;

    profiles[userEmail] = { ...existing, ...updates };
    this.saveAllProfiles(profiles);

    return true;
  }

  /**
   * Get user addresses
   */
  getAddresses(userEmail: string): SavedAddress[] {
    const profile = this.getProfile(userEmail);
    return profile?.addresses || [];
  }

  /**
   * Add address
   */
  addAddress(userEmail: string, address: Omit<SavedAddress, 'id'>): SavedAddress {
    const profile = this.getProfile(userEmail) || this.createOrUpdateProfile(userEmail, {});
    
    const newAddress: SavedAddress = {
      ...address,
      id: crypto.randomUUID()
    };

    // If this is the first address or marked as default, set as default
    if (profile.addresses.length === 0 || newAddress.isDefault) {
      // Remove default from other addresses
      profile.addresses.forEach(addr => addr.isDefault = false);
      newAddress.isDefault = true;
    }

    profile.addresses.push(newAddress);
    this.createOrUpdateProfile(userEmail, profile);

    return newAddress;
  }

  /**
   * Update address
   */
  updateAddress(userEmail: string, addressId: string, updates: Partial<SavedAddress>): boolean {
    const profile = this.getProfile(userEmail);
    if (!profile) return false;

    const addressIndex = profile.addresses.findIndex(addr => addr.id === addressId);
    if (addressIndex === -1) return false;

    // If setting as default, remove default from others
    if (updates.isDefault) {
      profile.addresses.forEach(addr => addr.isDefault = false);
    }

    profile.addresses[addressIndex] = {
      ...profile.addresses[addressIndex],
      ...updates
    };

    this.createOrUpdateProfile(userEmail, profile);
    return true;
  }

  /**
   * Delete address
   */
  deleteAddress(userEmail: string, addressId: string): boolean {
    const profile = this.getProfile(userEmail);
    if (!profile) return false;

    const wasDefault = profile.addresses.find(addr => addr.id === addressId)?.isDefault;
    profile.addresses = profile.addresses.filter(addr => addr.id !== addressId);

    // If deleted address was default, make first address default
    if (wasDefault && profile.addresses.length > 0) {
      profile.addresses[0].isDefault = true;
    }

    this.createOrUpdateProfile(userEmail, profile);
    return true;
  }

  /**
   * Get default address
   */
  getDefaultAddress(userEmail: string): SavedAddress | null {
    const addresses = this.getAddresses(userEmail);
    return addresses.find(addr => addr.isDefault) || addresses[0] || null;
  }

  /**
   * Get user settings
   */
  getSettings(userEmail: string): UserSettings {
    const profile = this.getProfile(userEmail);
    return profile?.settings || {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true
    };
  }

  /**
   * Update settings
   */
  updateSettings(userEmail: string, settings: Partial<UserSettings>): boolean {
    const profile = this.getProfile(userEmail);
    if (!profile) {
      // Create profile with settings
      this.createOrUpdateProfile(userEmail, { settings: settings as UserSettings });
      return true;
    }

    profile.settings = { ...profile.settings, ...settings };
    this.createOrUpdateProfile(userEmail, profile);
    return true;
  }

  /**
   * Add order to user profile
   */
  addOrderToProfile(userEmail: string, orderId: string): void {
    const profile = this.getProfile(userEmail) || this.createOrUpdateProfile(userEmail, {});
    
    if (!profile.orders.includes(orderId)) {
      profile.orders.push(orderId);
      this.createOrUpdateProfile(userEmail, profile);
    }
  }
}

export const userProfileManager = new UserProfileManager();
