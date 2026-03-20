import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, CheckoutRecord } from '../models/cart.model';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartItem[]>([]);
  cartCount = computed(() => this.cart().reduce((total, item) => total + item.quantity, 0));

  private lastLoadedKey: string | null = null;

  constructor(private userService: UserService) {
    effect(
      () => {
        const user = this.userService.currentUser();
        const key = user ? this.getCartKey(user.username) : null;

        // Only reload when the current user changes (or logs out)
        if (key === this.lastLoadedKey) return;
        this.lastLoadedKey = key;

        if (!key) {
          this.cart.set([]);
          return;
        }

        this.loadCartForKey(key);
      },
      { allowSignalWrites: true }
    );
  }

  private getCartKey(username: string): string {
    return `appcart_cart_${username.trim().toLowerCase()}`;
  }

  private saveCart(): void {
    const user = this.userService.currentUser();
    if (!user) return;

    const key = this.getCartKey(user.username);
    localStorage.setItem(key, JSON.stringify(this.cart()));
  }

  private loadCartForKey(key: string): void {
    const stored = localStorage.getItem(key);
    if (!stored) {
      this.cart.set([]);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      this.cart.set(Array.isArray(parsed) ? parsed : []);
    } catch {
      this.cart.set([]);
    }
  }

  addToCart(appName: string): void {
    this.cart.update(c => {
      const existing = c.find(item => item.name === appName);
      if (existing) {
        existing.quantity++;
        return [...c];
      }
      return [...c, { name: appName, quantity: 1 }];
    });
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cart.update(c => {
      if (c[index].quantity > 1) {
        c[index].quantity--;
        return [...c];
      }
      return c.filter((_, i) => i !== index);
    });
    this.saveCart();
  }

  incrementQuantity(index: number): void {
    this.cart.update(c => {
      c[index].quantity++;
      return [...c];
    });
    this.saveCart();
  }

  decrementQuantity(index: number): void {
    this.cart.update(c => {
      if (c[index].quantity > 1) {
        c[index].quantity--;
        return [...c];
      }
      return c.filter((_, i) => i !== index);
    });
    this.saveCart();
  }

  clearCart(): void {
    this.cart.set([]);
    this.saveCart();
  }

  private getCheckoutHistoryKey(username: string): string {
    return `appcart_checkout_history_${username.trim().toLowerCase()}`;
  }

  checkout(): boolean {
    const user = this.userService.currentUser();
    const items = this.cart();
    if (!items.length) return false;

    if (user) {
      const key = this.getCheckoutHistoryKey(user.username);
      const history: CheckoutRecord[] = JSON.parse(localStorage.getItem(key) || '[]');
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      history.push({ items: [...items], totalItems, username: user.username });
      localStorage.setItem(key, JSON.stringify(history));
    }

    this.clearCart();
    return true;
  }
}
