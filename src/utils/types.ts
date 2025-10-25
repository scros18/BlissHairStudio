// Type Definitions

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  badge?: string;
  slug?: string; // stable slug derived from title
  sizes?: string[]; // Available sizes (e.g., ["325ml", "1L"])
  createdAt: number;
  updatedAt: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string; // Store the selected size
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  notes?: string;
}

export interface PaymentDetails {
  method: 'card' | 'paypal';
  cardLast4?: string;
  cardBrand?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: number;
  updatedAt: number;
}

export interface SavedAddress {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  isDefault: boolean;
}

export interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  addresses: SavedAddress[];
  settings: UserSettings;
  orders: string[]; // Order IDs
  createdAt: number;
}

export interface User {
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  role: 'admin' | 'customer';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface NotificationOptions {
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
