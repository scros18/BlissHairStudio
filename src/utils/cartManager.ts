// Cart Manager - Shopping cart operations

import { storage } from './storage';
import type { Cart, Product } from './types';

const CART_KEY = 'cart';

class CartManager {
  private cart: Cart = {
    items: [],
    total: 0
  };
  private listeners: Array<(cart: Cart) => void> = [];

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const stored = storage.get<Cart>(CART_KEY);
    if (stored) {
      this.cart = stored;
    }
  }

  private saveCart(): void {
    storage.set(CART_KEY, this.cart);
    this.notifyListeners();
  }

  private calculateTotal(): void {
    this.cart.total = this.cart.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.cart));
  }

  subscribe(listener: (cart: Cart) => void): () => void {
    this.listeners.push(listener);
    listener(this.cart); // Initial call
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getCart(): Cart {
    return { ...this.cart };
  }

  getItemCount(): number {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.cart.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.items.push({ product, quantity });
    }
    
    this.calculateTotal();
    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cart.items.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.calculateTotal();
        this.saveCart();
      }
    }
  }

  removeItem(productId: string): void {
    this.cart.items = this.cart.items.filter(item => item.product.id !== productId);
    this.calculateTotal();
    this.saveCart();
  }

  clearCart(): void {
    this.cart = {
      items: [],
      total: 0
    };
    this.saveCart();
  }
}

export const cartManager = new CartManager();
