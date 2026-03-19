import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, CheckoutRecord } from '../models/models';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartItem[]>([]);
  cartCount = computed(() => this.cart().length);

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
    this.cart.update(c => [...c, { name: appName }]);
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cart.update(c => c.filter((_, i) => i !== index));
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
      history.push({ items: [...items], totalItems: items.length, username: user.username });
      localStorage.setItem(key, JSON.stringify(history));
    }

    this.clearCart();
    return true;
  }
}
