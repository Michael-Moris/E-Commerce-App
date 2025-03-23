import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    DatePipe,
  provideRouter(routes, withHashLocation()),
  provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(), withInterceptors([authInterceptor, loadingInterceptor])),
  importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule, BrowserModule),
  provideToastr(),
  ]
};
