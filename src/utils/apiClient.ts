// API Client for BlissHairStudio
// Handles all communication with the backend API server

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8787/api';

interface ApiConfig {
  method?: string;
  body?: any;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request(endpoint: string, config: ApiConfig = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method: config.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (config.body) {
      options.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, options);
      
      if (response.status === 204) {
        return null; // No content
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API Error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Products API
  async getProducts() {
    return this.request('/products');
  }

  async createProduct(product: any) {
    return this.request('/products', { method: 'POST', body: product });
  }

  async updateProduct(id: string, updates: any) {
    return this.request(`/products/${id}`, { method: 'PUT', body: updates });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, { method: 'DELETE' });
  }

  // Orders API
  async getOrders() {
    return this.request('/orders');
  }

  async createOrder(order: any) {
    return this.request('/orders', { method: 'POST', body: order });
  }

  async updateOrder(id: string, updates: any) {
    return this.request(`/orders/${id}`, { method: 'PUT', body: updates });
  }

  async deleteOrder(id: string) {
    return this.request(`/orders/${id}`, { method: 'DELETE' });
  }

  // Categories API
  async getCategories() {
    return this.request('/categories');
  }

  async createCategory(category: any) {
    return this.request('/categories', { method: 'POST', body: category });
  }

  async updateCategory(id: string, updates: any) {
    return this.request(`/categories/${id}`, { method: 'PUT', body: updates });
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, { method: 'DELETE' });
  }

  // Users API
  async getUsers() {
    return this.request('/users');
  }

  async createUser(user: any) {
    return this.request('/users', { method: 'POST', body: user });
  }

  async updateUser(id: string, updates: any) {
    return this.request(`/users/${id}`, { method: 'PUT', body: updates });
  }

  // Passwords API
  async getPasswords() {
    return this.request('/passwords');
  }

  async savePassword(userId: string, password: string) {
    return this.request('/passwords', { method: 'POST', body: { userId, password } });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
