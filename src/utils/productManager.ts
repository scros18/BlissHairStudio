// Product Manager - CRUD operations for products

import { storage } from './storage';
import type { Product } from './types';

const PRODUCTS_KEY = 'products';
const API_BASE = (window as any).__BLISS_API_BASE__ || '/api/products';

class ProductManager {
  private products: Product[] = [];
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.loadProducts();
  }

  async waitForInit(): Promise<void> {
    await this.initialized;
  }

  private async fetchJson(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
  }

  private async loadProducts(): Promise<void> {
    try {
      // Prefer API if available
      const apiProducts = await this.fetchJson(API_BASE);
      this.products = apiProducts as Product[];
      storage.set(PRODUCTS_KEY, this.products);
      console.log('✅ Loaded products from API:', this.products.length);
      return;
    } catch {
      // Try static file
      try {
        const response = await fetch('/products.json');
        if (response.ok) {
          this.products = await response.json();
          storage.set(PRODUCTS_KEY, this.products);
          console.log('✅ Loaded products from products.json:', this.products.length);
          return;
        }
      } catch {}
    }

    // Fallback to localStorage
    const stored = storage.get<Product[]>(PRODUCTS_KEY);
    if (stored && stored.length > 0) {
      this.products = stored;
      console.log('✅ Loaded products from localStorage:', this.products.length);
    } else {
      this.products = this.getDefaultProducts();
      storage.set(PRODUCTS_KEY, this.products);
      console.log('✅ Loaded default products:', this.products.length);
    }
  }

  private getDefaultProducts(): Product[] {
    return [
      {
        id: this.generateId(),
        title: 'Moisture Senses Hydrating Conditioner',
        description: 'Deeply nourish and hydrate dry, damaged hair with this luxurious salon treatment by Davroe. Perfect for all hair types needing moisture and shine.',
        price: 29.95,
        image: '/Davroe_Moisture_Senses_Hydrating_Conditioner_325ml__99636.jpg',
        badge: 'Popular',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        id: this.generateId(),
        title: 'Protein Hair Rebuilder',
        description: 'Intensive reparative treatment that reconstructs and strengthens damaged hair from within. Restores elasticity and vitality to weakened strands.',
        price: 39.95,
        image: '/Davroe_Protein_Hair_Rebuilder_200ml__77435.jpg',
        badge: 'Best Seller',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        id: this.generateId(),
        title: 'Shine Fluid & Thermaprotect Duo',
        description: 'The ultimate styling duo - Davroe Shine Fluid and Thermaprotect for gorgeous, protected hair with brilliant shine. Perfect for heat styling.',
        price: 34.95,
        image: '/Davroe_Thermaprotect_200ml__47285.jpg',
        badge: 'New',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ];
  }

  private saveLocal(): void {
    storage.set(PRODUCTS_KEY, this.products);
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
    const withSlug = { ...productData, slug: this.makeSlug(productData.title) };
    try {
      const created = await this.fetchJson(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withSlug)
      });
      this.products.push(created as Product);
    } catch {
      const product: Product = { ...withSlug, id: this.generateId(), createdAt: Date.now(), updatedAt: Date.now() };
      this.products.push(product);
    }
    this.saveLocal();
    return this.products[this.products.length - 1];
  }

  async updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    const current = this.products[index];
    const next = { ...updates } as any;
    if (updates.title) {
      next.slug = this.makeSlug(updates.title);
    }
    try {
      const updated = await this.fetchJson(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next)
      });
      this.products[index] = updated as Product;
    } catch {
      this.products[index] = { ...current, ...next, updatedAt: Date.now() } as Product;
    }
    this.saveLocal();
    return this.products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const initialLength = this.products.length;
    try {
      await this.fetchJson(`${API_BASE}/${id}`, { method: 'DELETE' });
      this.products = this.products.filter(p => p.id !== id);
    } catch {
      this.products = this.products.filter(p => p.id !== id);
    }
    this.saveLocal();
    return this.products.length < initialLength;
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

export const productManager = new ProductManager();
