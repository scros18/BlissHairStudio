// Product Manager - CRUD operations for products

import { storage } from './storage';
import type { Product } from './types';

const PRODUCTS_KEY = 'products';

class ProductManager {
  private products: Product[] = [];

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    const stored = storage.get<Product[]>(PRODUCTS_KEY);
    this.products = stored || this.getDefaultProducts();
    this.saveProducts();
  }

  private getDefaultProducts(): Product[] {
    return [
      {
        id: this.generateId(),
        title: 'Luxury Hydrating Hair Serum',
        description: 'Nourishing serum infused with argan oil and vitamins for silky, smooth hair. Perfect for all hair types.',
        price: 24.99,
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
}

export const productManager = new ProductManager();
