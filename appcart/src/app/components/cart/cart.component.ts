import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  backEvent = output<void>();

  constructor(
    public cartService: CartService,
    public userService: UserService
  ) {}

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
      alert('Cart cleared!');
    }
  }

  back(): void { this.backEvent.emit(); }

  checkout(): void {
    if (this.cartService.cart().length === 0) {
      alert('Your cart is empty.');
      return;
    }
    if (confirm(`Checkout ${this.cartService.cart().length} item(s)?`)) {
      this.cartService.checkout();
      alert(`Successfully checked out!`);
      this.backEvent.emit();
    }
  }
}
