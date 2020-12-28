import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  secretKey = 'secretKey@123';
  tokenKey = 'InventoryToken';

  jwtHelper: JwtHelperService = new JwtHelperService();
  authenticated = new BehaviorSubject<boolean>(null);
  isAuthenticated = false;

  constructor() {

  }

  encrypt(value: any) {

    return CryptoJS.AES.encrypt(value, this.secretKey);
  }

  decrypt(value: any) {

    var bytes = CryptoJS.AES.decrypt(value.toString(), this.secretKey);
    var decrytedText = bytes.toString(CryptoJS.enc.Utf8);
    return decrytedText;
  }

  setToken(value: any) {

    localStorage.setItem(this.tokenKey, this.encrypt(value));
  }

  getToken() {

    let token = localStorage.getItem(this.tokenKey);
    token = this.decrypt(token);
    return token;
  }

  removeToken() {

    localStorage.removeItem(this.tokenKey)
  }

  getTokenValueByKey(key: string): any {

    let token = this.getToken();

    if (token) {

      try {

        token = this.jwtHelper.decodeToken(token);
        const data = JSON.parse(token['data'] || '{}');

        if (key.charAt(0).toUpperCase() + key.slice(1) === 'All') {
          return data;
        }

        return data[key] || null;
      } catch (e) {

        return token;
      }
    }

    return null;
  }

  isTokenValid(): boolean {

    const token = this.getToken();
    return (token && !this.jwtHelper.isTokenExpired(token));
  }
}
