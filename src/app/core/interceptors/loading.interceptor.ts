import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject(NgxSpinnerService)
  const plat_id = inject(PLATFORM_ID)

  if (isPlatformBrowser(plat_id)) {
    if (localStorage.getItem('authToken') !== null) {
      spinner.show()
    }
  }

  return next(req).pipe(finalize(() => {
    spinner.hide()
  }))
};

