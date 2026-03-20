import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application } from '../../models/application.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css'],
})
export class ApplicationDetailComponent {
  application = input.required<Application>();
  backEvent = output<void>();

  constructor(public cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.application().name);
    alert(`${this.application().name} added to cart!`);
  }

  back(): void {
    this.backEvent.emit();
  }
}
