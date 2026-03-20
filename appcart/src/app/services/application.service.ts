import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  getApplications(): Application[] {
    return Array.from({ length: 25 }, (_, i) => ({
      name: `Application ${i + 1}`,
      description: `Description for application ${i + 1}`,
      image: 'assets/applications1.avif',
      price: Math.floor(Math.random() * 900) + 100,
    }));
  }
}
