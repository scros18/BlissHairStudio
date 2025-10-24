// Category Manager - CRUD operations for categories with JSON support

import { storage } from './storage';

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: number;
  updatedAt: number;
}

const CATEGORIES_KEY = 'categories';

class CategoryManager {
  private categories: Category[] = [];
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.loadCategories();
  }

  async waitForInit(): Promise<void> {
    await this.initialized;
  }

  private async loadCategories(): Promise<void> {
    try {
      // Try to load from categories.json first
      const response = await fetch('/categories.json');
      if (response.ok) {
        this.categories = await response.json();
        console.log('✅ Loaded categories from categories.json:', this.categories.length);
        // Also save to localStorage as backup
        storage.set(CATEGORIES_KEY, this.categories);
        return;
      }
    } catch (error) {
      console.log('⚠️ Could not load categories.json, checking localStorage...');
    }

    // Fallback to localStorage
    const stored = storage.get<Category[]>(CATEGORIES_KEY);
    if (stored && stored.length > 0) {
      this.categories = stored;
      console.log('✅ Loaded categories from localStorage:', this.categories.length);
    } else {
      this.categories = [];
      console.log('✅ No categories found, starting fresh');
    }
  }

  private saveCategories(): void {
    storage.set(CATEGORIES_KEY, this.categories);
  }

  private generateId(): string {
    return `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  getAllCategories(): Category[] {
    return [...this.categories];
  }

  getCategory(id: string): Category | undefined {
    return this.categories.find(c => c.id === id);
  }

  addCategory(name: string): Category {
    const category: Category = {
      id: this.generateId(),
      name: name.trim(),
      slug: this.generateSlug(name),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    this.categories.push(category);
    this.saveCategories();
    return category;
  }

  updateCategory(id: string, name: string): Category | null {
    const index = this.categories.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    this.categories[index] = {
      ...this.categories[index],
      name: name.trim(),
      slug: this.generateSlug(name),
      updatedAt: Date.now()
    };
    
    this.saveCategories();
    return this.categories[index];
  }

  deleteCategory(id: string): boolean {
    const initialLength = this.categories.length;
    this.categories = this.categories.filter(c => c.id !== id);
    
    if (this.categories.length < initialLength) {
      this.saveCategories();
      return true;
    }
    
    return false;
  }

  exportToJSON(): string {
    return JSON.stringify(this.categories, null, 2);
  }

  downloadJSON(): void {
    const json = this.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `categories-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

export const categoryManager = new CategoryManager();
