// Product Manager - CRUD operations for products

import { storage } from './storage';
import type { Product } from './types';

const PRODUCTS_KEY = 'products';

class ProductManager {
  private products: Product[] = [];

  constructor() {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    try {
      // Try to load from products.json first
      const response = await fetch('/products.json');
      if (response.ok) {
        this.products = await response.json();
        // Also save to localStorage as backup
        storage.set(PRODUCTS_KEY, this.products);
        return;
      }
    } catch (error) {
      console.log('Could not load products.json, checking localStorage...');
    }

    // Fallback to localStorage
    const stored = storage.get<Product[]>(PRODUCTS_KEY);
    this.products = stored || this.getDefaultProducts();
    this.saveProducts();
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

  private saveProducts(): void {
    storage.set(PRODUCTS_KEY, this.products);
  }

  private generateId(): string {
    return `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const product: Product = {
      ...productData,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    this.products.push(product);
    this.saveProducts();
    return product;
  }

  updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | null {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: Date.now()
    };
    
    this.saveProducts();
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    
    if (this.products.length < initialLength) {
      this.saveProducts();
      return true;
    }
    
    return false;
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
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
