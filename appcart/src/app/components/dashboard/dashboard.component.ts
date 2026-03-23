import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  applications: Application[] = [];

  constructor(
    public userService: UserService,
    public cartService: CartService,
    private appService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.currentUser()) {
      this.router.navigate(['/login']);
      return;
    }
    this.applications = this.appService.getApplications();
  }

  addToCart(appName: string): void {
    this.cartService.addToCart(appName);
    alert(`${appName} added to cart!`);
  }

  viewApplication(app: Application): void {
    this.router.navigate(['/details', app.name]);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
