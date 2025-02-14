/** Interface que contiene el token opcionalmente */
export interface TokenContainer {
  token?: string;
}

/** Datos necesarios para el login */
export interface AuthData {
  email: string;
  password: string;
}

/** Datos necesarios para el registro */
export interface RegisterData extends AuthData {
  name: string;
}

/** Respuesta del login que contiene el token */
export interface LoginResponse extends TokenContainer {
  email: string;
  name: string;
  id: string;
}

/** Respuesta del registro que contiene el token */
export interface RegisterResponse extends TokenContainer {
  email: string;
  name: string;
}

export interface UpdateUser {
  id: string;
}

export interface UpdateResponse extends UpdateUser {
  email: string;
  name: string;
  isAcive: boolean;
  rol: string;
}
