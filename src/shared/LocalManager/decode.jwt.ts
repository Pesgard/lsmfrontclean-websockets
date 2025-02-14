import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';

interface Payload {
  exp: number;
  iat: number;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class DecodeJwtService {
  decodeId(token: string): string {
    const tokenContainer: Payload = jwtDecode(token);
    return tokenContainer.id;
  }

  decodeExpiration(token: string): number {
    const tokenContainer: Payload = jwtDecode(token);
    return tokenContainer.exp;
  }

  decodeIssuedAt(token: string): number {
    const tokenContainer: Payload = jwtDecode(token);
    return tokenContainer.iat;
  }
}
