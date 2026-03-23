import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ApplicationDetailComponent } from './components/application-detail/application-detail.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // default route - login
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details/:name', component: ApplicationDetailComponent },
  { path: 'cart', component: CartComponent },

  { path: '**', redirectTo: '' } // wildcard route
];