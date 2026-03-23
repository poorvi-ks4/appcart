import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

console.log('LoginComponent class loaded');

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private userService: UserService, private router: Router) {
    console.log('LoginComponent instance created');
  }

  onLogin(): void {
    this.error = '';
    const ok = this.userService.login(this.username.trim(), this.password);
    if (!ok) {
      this.error = 'Invalid username or password.';
      return;
    }
    this.router.navigate(['/dashboard']);
  }
}
