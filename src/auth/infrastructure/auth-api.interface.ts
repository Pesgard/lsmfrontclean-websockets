import { Observable } from 'rxjs';
import {
  RegisterData,
  AuthData,
  RegisterResponse,
  LoginResponse,
  UserResponse,
  UserToken,
} from './models/auth-api.models';
export interface AuthApi {
  login: (user: AuthData) => Observable<LoginResponse>;
  logout: () => void;
  register: (user: RegisterData) => Observable<RegisterResponse>;
  update: (id: string) => Observable<UserResponse>;
  isLoggedIn: () => boolean;
  getUserData: (id: string) => Observable<UserResponse>;
}
