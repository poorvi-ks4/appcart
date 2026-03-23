import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public cartService: CartService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.currentUser()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  incrementQuantity(index: number): void {
    this.cartService.incrementQuantity(index);
  }

  decrementQuantity(index: number): void {
    this.cartService.decrementQuantity(index);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
      alert('Cart cleared!');
    }
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }

  checkout(): void {
    if (this.cartService.cart().length === 0) {
      alert('Your cart is empty.');
      return;
    }
    if (confirm(`Checkout ${this.cartService.cart().length} item(s)?`)) {
      this.cartService.checkout();
      alert(`Successfully checked out!`);
      this.router.navigate(['/dashboard']);
    }
  }
}
