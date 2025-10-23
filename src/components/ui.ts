// UI Utilities and Notification System

import type { NotificationOptions } from '../utils/types';

export class UI {
  static showNotification(message: string, options: NotificationOptions = {}): void {
    const { type = 'success', duration = 3000 } = options;
    
    // Remove existing notification
    const existing = document.querySelector('.toast');
    if (existing) {
      existing.remove();
    }
    
    // Create notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
      toast.style.animation = 'slideOutDown 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, duration);
  }

  static showModal(content: HTMLElement | string, title?: string): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const header = document.createElement('div');
    header.className = 'modal-header';
    
    if (title) {
      const titleEl = document.createElement('h2');
      titleEl.className = 'modal-title';
      titleEl.textContent = title;
      header.appendChild(titleEl);
    }
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);
    
    const body = document.createElement('div');
    body.className = 'modal-body';
    
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else {
      body.appendChild(content);
    }
    
    modal.appendChild(header);
    modal.appendChild(body);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };
    
    return overlay;
  }

  static confirm(message: string, onConfirm: () => void, onCancel?: () => void): void {
    const content = document.createElement('div');
    content.innerHTML = `<p style="margin-bottom: 20px;">${message}</p>`;
    
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Cancel';
    
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-primary';
    confirmBtn.textContent = 'Confirm';
    
    footer.appendChild(cancelBtn);
    footer.appendChild(confirmBtn);
    content.appendChild(footer);
    
    const modal = this.showModal(content, 'Confirm Action');
    
    cancelBtn.onclick = () => {
      modal.remove();
      if (onCancel) onCancel();
    };
    
    confirmBtn.onclick = () => {
      modal.remove();
      onConfirm();
    };
  }

  static showLoading(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cursor = 'wait';
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner spinner-lg';
    
    overlay.appendChild(spinner);
    document.body.appendChild(overlay);
    
    return overlay;
  }
}
