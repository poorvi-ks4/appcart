import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../models/application.model';
import { CartService } from '../../services/cart.service';
import { ApplicationService } from '../../services/application.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css'],
})
export class ApplicationDetailComponent implements OnInit {
  application: Application | null = null;

  constructor(
    public cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private appService: ApplicationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.userService.currentUser()) {
      this.router.navigate(['/login']);
      return;
    }
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.application = this.appService.getApplications().find(app => app.name === name) || null;
    }
  }

  addToCart(): void {
    if (this.application) {
      this.cartService.addToCart(this.application.name);
      alert(`${this.application.name} added to cart!`);
    }
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }
}
