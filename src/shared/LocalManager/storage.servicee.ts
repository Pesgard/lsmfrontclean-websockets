import { Injectable } from '@angular/core';

export enum LocalKeys {
  token = 'token',
  email = 'email',
  name = 'name',
  id = 'id',
}

@Injectable({
  providedIn: 'root',
})
export class LocalManagerService {
  static getElement(key: LocalKeys): string | null {
    return localStorage.getItem(key);
  }

  static setElement(key: LocalKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  static clearStorage(): void {
    localStorage.clear();
  }
}
