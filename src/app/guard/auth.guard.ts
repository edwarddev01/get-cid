import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';


export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if (authService.getAuthToken()) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }

};

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if (!authService.getAuthToken()) {
    router.navigate(['/get-cid']);
    return false;
  } else {
    return true;
  }
};

