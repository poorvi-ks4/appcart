import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

console.log('Bootstrapping Angular App...');
console.log('AppComponent:', AppComponent);
console.log('appConfig:', appConfig);

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Angular App bootstrapped successfully'))
  .catch(err => {
    console.error('Bootstrap error:', err);
  });
