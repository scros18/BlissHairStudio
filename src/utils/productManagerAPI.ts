// Product Manager - Complete API integration with JSON storage

import type { Product } from './types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

class ProductManagerAPI {
  private products: Product[] = [];
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.loadProducts();
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

  private async loadProducts(): Promise<void> {
    try {
      const apiProducts = await this.fetchJson(`${API_BASE}/products`);
      this.products = (apiProducts as Product[]) || [];
      console.log('✅ Loaded', this.products.length, 'products from API (data/products.json)');
    } catch (error) {
      console.error('⚠️ Failed to load products from API:', error);
      this.products = this.getDefaultProducts();
    }
  }

  private getDefaultProducts(): Product[] {
    return [
      {
        id: this.generateId(),
        title: 'Moisture Senses Hydrating Conditioner',
        slug: 'moisture-senses-hydrating-conditioner',
        description: 'Deeply nourish and hydrate dry, damaged hair with this luxurious salon treatment by Davroe.',
        price: 29.95,
        image: '/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg',
        badge: 'Popular',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        id: this.generateId(),
        title: 'Protein Hair Rebuilder',
        slug: 'protein-hair-rebuilder',
        description: 'Intensive reparative treatment that reconstructs and strengthens damaged hair from within.',
        price: 39.95,
        image: '/Davroe_Protein_Hair_Rebuilder_200ml__77435.jpg',
        badge: 'Best Seller',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        id: this.generateId(),
        title: 'Shine Fluid & Thermaprotect Duo',
        slug: 'shine-fluid-thermaprotect-duo',
        description: 'The ultimate styling duo - Davroe Shine Fluid and Thermaprotect for gorgeous, protected hair.',
        price: 34.95,
        image: '/Davroe_Thermaprotect_200ml__47285.jpg',
        badge: 'New',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ];
  }

  private generateId(): string {
    return `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private makeSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  async addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const withSlug = { 
      ...productData, 
      slug: productData.slug || this.makeSlug(productData.title) 
    };
    
    try {
      const created = await this.fetchJson(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withSlug)
      });
      const product = created as Product;
      this.products.push(product);
      console.log('✅ Product added and saved to data/products.json:', product.title);
      return product;
    } catch (error) {
      console.error('❌ Failed to add product:', error);
      throw new Error('Failed to add product. Please try again.');
    }
  }

  async updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updateData = { ...updates } as any;
    if (updates.title && !updates.slug) {
      updateData.slug = this.makeSlug(updates.title);
    }

    try {
      const updated = await this.fetchJson(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      this.products[index] = updated as Product;
      console.log('✅ Product updated and saved to data/products.json:', this.products[index].title);
      return this.products[index];
    } catch (error) {
      console.error('❌ Failed to update product:', error);
      return null;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await this.fetchJson(`${API_BASE}/products/${id}`, { 
        method: 'DELETE' 
      });
      
      this.products = this.products.filter(p => p.id !== id);
      console.log('✅ Product deleted from data/products.json:', id);
      return true;
    } catch (error) {
      console.error('❌ Failed to delete product:', error);
      return false;
    }
  }

  async refresh(): Promise<void> {
    await this.loadProducts();
  }

  exportToJSON(): string {
    return JSON.stringify(this.products, null, 2);
  }

  downloadJSON(): void {
    const json = this.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `products-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

export const productManagerAPI = new ProductManagerAPI();
