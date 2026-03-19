import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { UserService } from './services/user.service';

type View = 'login' | 'dashboard' | 'cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, DashboardComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  view = signal<View>('login');

  constructor(private userService: UserService) {}

  onLoggedIn(): void  { this.view.set('dashboard'); }
  onGoToCart(): void  { this.view.set('cart'); }
  onBack(): void      { this.view.set('dashboard'); }

  onLogout(): void {
    this.userService.logout();
    this.view.set('login');
  }
}
