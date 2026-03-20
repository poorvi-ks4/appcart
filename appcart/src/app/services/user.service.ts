import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly STORAGE_KEY = 'appcart_current_user';

  private readonly users: User[] = [
    { username: 'admin', password: '12345' },
    { username: 'john',  password: '12345' },
    { username: 'mary',  password: '67890' },
  ];

  currentUser = signal<User | null>(null);

  constructor() {
    this.loadUserFromStorage();
  }

  private normalizeUsername(username: string): string {
    return username.trim().toLowerCase();
  }

  private loadUserFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return;

    try {
      const user: User = JSON.parse(stored);
      if (user?.username) {
        user.username = this.normalizeUsername(user.username);
        this.currentUser.set(user);
      }
    } catch {
      // ignore invalid stored value
    }
  }

  login(username: string, password: string): boolean {
    const normalized = this.normalizeUsername(username);
    const user = this.users.find(
      u => u.username === normalized && u.password === password
    );
    if (!user) return false;

    this.currentUser.set(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
