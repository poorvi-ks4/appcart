import { Component, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Application } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  goToCartEvent = output<void>();
  logoutEvent = output<void>();

  applications: Application[] = [];

  constructor(
    public userService: UserService,
    public cartService: CartService,
    private appService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.applications = this.appService.getApplications();
  }

  addToCart(appName: string): void {
    this.cartService.addToCart(appName);
    alert(`${appName} added to cart!`);
  }

  goToCart(): void { this.goToCartEvent.emit(); }
  logout(): void { this.logoutEvent.emit(); }
}
