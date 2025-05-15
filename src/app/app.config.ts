import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom   } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations  } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    FlexLayoutModule,
    provideHttpClient(withFetch()),
    provideAnimations(),
  ],
};