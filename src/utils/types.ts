// Type Definitions

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  badge?: string;
  slug?: string; // stable slug derived from title
  createdAt: number;
  updatedAt: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: number;
}

export interface User {
  email: string;
  role: 'admin';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface NotificationOptions {
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
