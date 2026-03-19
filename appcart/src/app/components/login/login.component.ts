import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loggedIn = output<void>();

  username = '';
  password = '';
  error = '';

  constructor(private userService: UserService) {}

  onLogin(): void {
    this.error = '';
    const ok = this.userService.login(this.username.trim(), this.password);
    if (!ok) {
      this.error = 'Invalid username or password.';
      return;
    }
    this.loggedIn.emit();
  }
}
