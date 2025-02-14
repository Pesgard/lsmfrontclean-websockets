import { LoginResponse, RegisterResponse } from '../../domain/auth.model';
export const AuthAdapter = (loginResponse: LoginResponse): string =>
  loginResponse.token || '';

export const RegisterAdapter = (registerResponse: RegisterResponse): string =>
  registerResponse.token || '';
