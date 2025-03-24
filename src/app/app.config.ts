import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LOCALE_ID } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'tr' },
    provideHttpClient()  // Bu çok önemli
  ]
};
