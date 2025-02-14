import { HttpInterceptorFn } from '@angular/common/http';
import {
  LocalKeys,
  LocalManagerService,
} from '../../../shared/LocalManager/storage.servicee';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = LocalManagerService.getElement(LocalKeys.token);
  let headers = req.headers.set('Content-Type', 'application/json');

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({ headers });

  return next(authReq);
};
