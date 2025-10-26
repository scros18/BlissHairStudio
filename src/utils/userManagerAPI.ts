import type { User } from './authManagerAPI';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

export const userManagerAPI = {
  async getAll(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error('Failed to load users');
    return res.json();
  },
  async update(id: string, updates: Partial<User>): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  }
};
