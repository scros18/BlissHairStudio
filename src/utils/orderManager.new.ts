// Order Manager - API-backed order management system

import type { Order, CartItem, ShippingAddress, PaymentDetails } from './types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

class OrderManager {
  private orders: Order[] = [];
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.loadOrders();
  }

  async waitForInit(): Promise<void> {
    await this.initialized;
  }

  private async fetchJson(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
  }

  private async loadOrders(): Promise<void> {
    try {
      const apiOrders = await this.fetchJson(`${API_BASE}/api/orders`);
      this.orders = (apiOrders as Order[]) || [];
      console.log('✅ Loaded orders from API:', this.orders.length);
    } catch (error) {
      console.error('⚠️ Failed to load orders from API, starting empty:', error);
      this.orders = [];
    }
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `BHS-${timestamp}-${random}`;
  }

  async createOrder(
    items: CartItem[],
    shippingAddress: ShippingAddress,
    paymentDetails: PaymentDetails,
    userId?: string
  ): Promise<Order> {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 5.00;
    const total = subtotal + shipping;

    const orderData = {
      orderNumber: this.generateOrderNumber(),
      userId,
      items: items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        price: item.product.price
      })),
      shippingAddress,
      paymentDetails,
      subtotal,
      shipping,
      total,
      status: 'pending' as const,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    try {
      const created = await this.fetchJson(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const order = created as Order;
      this.orders.unshift(order);
      console.log('✅ Order created:', order.orderNumber);
      return order;
    } catch (error) {
      console.error('❌ Failed to create order:', error);
      throw new Error('Failed to create order. Please try again.');
    }
  }

  getUserOrders(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  getAllOrders(): Order[] {
    return [...this.orders];
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    try {
      const updated = await this.fetchJson(`${API_BASE}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, updatedAt: Date.now() })
      });
      
      const index = this.orders.findIndex(o => o.id === orderId);
      if (index !== -1) {
        this.orders[index] = updated as Order;
      }
      console.log('✅ Order status updated:', orderId, status);
      return true;
    } catch (error) {
      console.error('❌ Failed to update order status:', error);
      return false;
    }
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    try {
      await this.fetchJson(`${API_BASE}/api/orders/${orderId}`, {
        method: 'DELETE'
      });
      
      this.orders = this.orders.filter(o => o.id !== orderId);
      console.log('✅ Order deleted:', orderId);
      return true;
    } catch (error) {
      console.error('❌ Failed to delete order:', error);
      return false;
    }
  }

  getStatusBadgeClass(status: Order['status']): string {
    const classes = {
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return classes[status] || 'status-pending';
  }

  getStatusDisplayText(status: Order['status']): string {
    const text = {
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return text[status] || 'Unknown';
  }

  formatOrderDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options);
  }

  getOrderStats() {
    const total = this.orders.length;
    const pending = this.orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
    const completed = this.orders.filter(o => o.status === 'delivered').length;
    const revenue = this.orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.total, 0);

    return { total, pending, completed, revenue };
  }

  async refresh(): Promise<void> {
    await this.loadOrders();
  }
}

export const orderManager = new OrderManager();
