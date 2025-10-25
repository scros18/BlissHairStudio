// Order Management System

import type { Order, ShippingAddress, PaymentDetails, CartItem } from './types';

class OrderManager {
  private readonly ORDERS_KEY = 'bliss_orders';
  private readonly USER_ORDERS_KEY = 'bliss_user_orders'; // userId -> orderIds[]

  /**
   * Generate unique order number
   */
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `BHS-${timestamp}-${random}`;
  }

  /**
   * Create a new order
   */
  createOrder(
    items: CartItem[],
    shippingAddress: ShippingAddress,
    paymentDetails: PaymentDetails,
    userId?: string
  ): Order {
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 5.00;
    const total = subtotal + shipping;

    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: this.generateOrderNumber(),
      userId,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      paymentDetails,
      status: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    // Save order
    this.saveOrder(order);

    // Link order to user if logged in
    if (userId) {
      this.linkOrderToUser(userId, order.id);
    }

    return order;
  }

  /**
   * Save order to storage
   */
  private saveOrder(order: Order): void {
    const orders = this.getAllOrders();
    orders.push(order);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
  }

  /**
   * Link order to user
   */
  private linkOrderToUser(userId: string, orderId: string): void {
    const userOrders = this.getUserOrders(userId);
    userOrders.push(orderId);
    localStorage.setItem(`${this.USER_ORDERS_KEY}_${userId}`, JSON.stringify(userOrders));
  }

  /**
   * Get all orders
   */
  getAllOrders(): Order[] {
    try {
      const data = localStorage.getItem(this.ORDERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get orders for specific user
   */
  getUserOrders(userId: string): string[] {
    try {
      const data = localStorage.getItem(`${this.USER_ORDERS_KEY}_${userId}`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get order by ID
   */
  getOrderById(orderId: string): Order | null {
    const orders = this.getAllOrders();
    return orders.find(order => order.id === orderId) || null;
  }

  /**
   * Get order by order number
   */
  getOrderByNumber(orderNumber: string): Order | null {
    const orders = this.getAllOrders();
    return orders.find(order => order.orderNumber === orderNumber) || null;
  }

  /**
   * Get orders for current user (by email)
   */
  getOrdersForUser(userEmail: string): Order[] {
    const allOrders = this.getAllOrders();
    return allOrders
      .filter(order => order.shippingAddress.email === userEmail || order.userId === userEmail)
      .sort((a, b) => b.createdAt - a.createdAt); // Most recent first
  }

  /**
   * Update order status
   */
  updateOrderStatus(orderId: string, status: Order['status']): boolean {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) return false;

    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = Date.now();
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    
    return true;
  }

  /**
   * Get order status badge class
   */
  getStatusBadgeClass(status: Order['status']): string {
    const classes = {
      pending: 'order-status-pending',
      processing: 'order-status-processing',
      shipped: 'order-status-shipped',
      delivered: 'order-status-delivered',
      cancelled: 'order-status-cancelled'
    };
    return classes[status] || 'order-status-pending';
  }

  /**
   * Get order status display text
   */
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

  /**
   * Format order date
   */
  formatOrderDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  /**
   * Delete order (admin only)
   */
  deleteOrder(orderId: string): boolean {
    const orders = this.getAllOrders();
    const filteredOrders = orders.filter(order => order.id !== orderId);
    
    if (filteredOrders.length === orders.length) return false;

    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(filteredOrders));
    return true;
  }
}

export const orderManager = new OrderManager();
