import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BallotAccessService } from './ballot-access.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const service = inject(BallotAccessService);
  const sessionToken = service.getTokenFromSession();
  if (sessionToken) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
