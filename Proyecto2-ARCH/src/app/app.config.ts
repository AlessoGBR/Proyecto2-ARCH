import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { authInterceptor } from './Interceptors/aut.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
};
