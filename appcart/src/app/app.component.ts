import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ApplicationDetailComponent } from './components/application-detail/application-detail.component';
import { Application } from './models/application.model';
import { UserService } from './services/user.service';

type View = 'login' | 'dashboard' | 'cart' | 'app-detail';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, DashboardComponent, CartComponent, ApplicationDetailComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  view = signal<View>('login');
  selectedApplication = signal<Application | null>(null);

  constructor(private userService: UserService) {}

  onLoggedIn(): void  { this.view.set('dashboard'); }
  onGoToCart(): void  { this.view.set('cart'); }
  onViewApplication(app: Application): void {
    this.selectedApplication.set(app);
    this.view.set('app-detail');
  }
  onBack(): void      { this.view.set('dashboard'); }

  onLogout(): void {
    this.userService.logout();
    this.view.set('login');
  }
}
