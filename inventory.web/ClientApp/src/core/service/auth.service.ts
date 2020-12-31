import { WebApiService } from 'src/core/service/web-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl = environment.apiUrl;

  secretKey = 'secretKey@123';
  tokenKey = 'InventoryToken';

  jwtHelper: JwtHelperService = new JwtHelperService();
  authenticated = new BehaviorSubject<boolean>(null);
  isAuthenticated = false;

  constructor(private http: HttpClient) {

  }

  encrypt(value: any) {

    if (value) {

      return CryptoJS.AES.encrypt(value, this.secretKey);
    } else {

      return null;
    }
  }

  decrypt(value: any) {

    if (value) {

      var bytes = CryptoJS.AES.decrypt(value.toString(), this.secretKey);
      var decrytedText = bytes.toString(CryptoJS.enc.Utf8);
      return decrytedText;
    } else {

      return null;
    }
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
        const data = JSON.parse(token['Data'] || '{}');

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

  logout() {

    this.logoutAsync().subscribe((response: any) => {

      this.setToken(response['token']);
      this.logoutSession();
    });
  }

  logoutSession() {

    sessionStorage.clear();
    // this.ngxCache.clearCache();
    this.isAuthenticated = false;
    this.authenticated.next(false);

    window.history.replaceState({}, 'login', '/login/');
    window.location.href = `${environment.webUrl}login/`;
  }

  logoutAsync(): Observable<any> {

    return this.http.post(this.apiUrl + 'Account/Logout', { Json: {} }, { headers: this.getHeaderOptions() });
  }

  getHeaderOptions(): HttpHeaders {

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST',
      Authorization: `Bearer ${token}`
    });
    return headers;
  }
}
