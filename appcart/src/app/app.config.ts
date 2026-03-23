import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

console.log('app.config.ts loaded');
console.log('Routes available:', routes.length, 'routes');

export const appConfig: ApplicationConfig = {
  providers: [
    //ovideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ],
};
