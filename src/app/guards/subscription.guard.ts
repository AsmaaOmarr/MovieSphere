import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Your authentication service

export const subscriptionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router to navigate

  if (authService.isSubscribed()) {
    return true;
  } else {
    router.navigate(['home/subscribe'], { queryParams: { alert: 'true' } });
    return false;
  }
};
