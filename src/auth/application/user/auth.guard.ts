import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserUseCaseService } from './auth-user-use-case.service';
import { DecodeJwtService } from '../../../shared/LocalManager/decode.jwt';
import {
  LocalKeys,
  LocalManagerService,
} from '../../../shared/LocalManager/storage.servicee';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authApiService = inject(AuthUserUseCaseService);
  const decodeJwtService = inject(DecodeJwtService);
  const router = inject(Router);

  let token = LocalManagerService.getElement(LocalKeys.token);
  if (token) {
    const tokenExp = decodeJwtService.decodeExpiration(token);
    const now = new Date().getTime() / 1000;
    if (tokenExp < now) {
      LocalManagerService.clearStorage();
      return router.navigate(['/login']);
    }
  }

  if (!authApiService.isLoggedIn()) {
    return router.navigate(['/login']);
  }

  return true;
};
