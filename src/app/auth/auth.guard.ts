import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Route guard that redirects to /login if the user is not logged in.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

/**
 * Route guard that checks if the user has one of the required roles.
 * Usage in routes: canActivate: [roleGuard('OWNER', 'TEACHER')]
 */
export function roleGuard(...allowedRoles: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    if (authService.hasAnyRole(...allowedRoles)) {
      return true;
    }

    // Logged in but wrong role — redirect to home
    router.navigate(['/']);
    return false;
  };
}

