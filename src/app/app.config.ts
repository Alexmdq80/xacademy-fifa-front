import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// export const appConfig: ApplicationConfig = {
//   // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
//   providers: [
//     provideRouter(routes), 
//     provideHttpClient(),
//     provideCharts(withDefaultRegisterables()), provideAnimationsAsync(), provideAnimationsAsync(),
//   ]
// };

export const appConfig: ApplicationConfig = {
  // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};
