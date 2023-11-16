import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      return true;
    }
    return false;
  }

  constructor() {}
}
