import { inject, Inject, Injectable } from '@angular/core';
import { AuthApiService } from '../../infrastructure/auth-api.service';
import { Observable } from 'rxjs';
import {
  AuthData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  UserResponse,
  UserToken,
} from '../../infrastructure/models/auth-api.models';

@Injectable({
  providedIn: 'root',
})
export class AuthUserUseCaseService {
  private _authApiService = inject(AuthApiService);

  login(user: AuthData): Observable<LoginResponse> {
    return this._authApiService.login(user);
  }

  logout() {
    return this._authApiService.logout();
  }

  register(
    user: RegisterData
    // confirmPassword: string
  ): Observable<RegisterResponse> {
    return this._authApiService.register(user);
  }

  update(id: string): Observable<UserResponse> {
    return this._authApiService.update(id);
  }

  isLoggedIn(): boolean {
    return this._authApiService.isLoggedIn();
  }

  getUserData(id: string): Observable<UserResponse> {
    return this._authApiService.getUserData(id);
  }
}
