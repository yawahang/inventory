import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService();
  subAuthenticated = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  encrypt(value: any) {

    if (value) {

      return CryptoJS.AES.encrypt(value, environment.secretKey);
    } else {

      return null;
    }
  }

  decrypt(value: any) {

    if (value) {

      var bytes = CryptoJS.AES.decrypt(value.toString(), environment.secretKey);
      var decrytedText = bytes.toString(CryptoJS.enc.Utf8);
      return decrytedText;
    } else {

      return null;
    }
  }

  setToken(token: any) {

    this.setLocalStorage('token', token);
  }

  getToken(): string {

    return this.getLocalStorage('token');
  }

  getTokenValueByKey(key: string): any {

    let token = this.decodeToken();
    if (token) {

      try {

        token = JSON.parse(token['User']);
        if (key.charAt(0).toUpperCase() + key.slice(1) === 'All') {
          return token;
        }

        return token[key] || null;
      } catch (e) {

        return token;
      }
    }

    return null;
  }

  decodeToken() {

    let token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    } else {

      return null;
    }
  }

  isTokenValid(): boolean {

    const token = this.getToken();
    return (token && !this.jwtHelper.isTokenExpired(token));
  }

  setLocalStorage(key: string, value: any) {

    let data = localStorage.getItem(environment.storageKey);
    if (data) {

      data = JSON.parse(this.decrypt(data));
      data = Object.assign(data, { [key]: value });
      localStorage.setItem(environment.storageKey, this.encrypt(JSON.stringify(data)));
    } else {

      let dataNew = Object.assign({}, { [key]: value });
      localStorage.setItem(environment.storageKey, this.encrypt(JSON.stringify(dataNew)));
    }
  }

  getLocalStorage(key: string) {

    let data = localStorage.getItem(environment.storageKey);
    if (data) {

      data = JSON.parse(this.decrypt(data));
      return data[key] || null;
    } else {

      return null;
    }
  }

  removeLocalStorage(key: string) {

    let data = localStorage.getItem(environment.storageKey);
    if (data) {

      data = JSON.parse(this.decrypt(data));
      if (data.hasOwnProperty(key)) {

        delete data[key];
      }
    }
  }

  clearLocalStorage() {

    if (localStorage.getItem(environment.storageKey)) {
      localStorage.removeItem(environment.storageKey);
    }
  }

  logout() {

    this.logoutAsync().subscribe((response: any) => {

      this.setToken(response['token']);
      this.logoutSession();
    });
  }

  logoutSession() {

    this.clearLocalStorage();
    // this.ngxCache.clearCache();
    this.setLocalStorage('isAuthenticated', false);
    this.redirectToLogin();
  }

  redirectToLogin() {

    window.history.replaceState({}, 'login', '/login/');
    window.location.href = `${environment.webUrl}login/`;
  }

  logoutAsync(): Observable<any> {

    return this.http.post(environment.apiUrl + 'Account/Logout', { Json: {} }, { headers: this.getHeaderOptions() });
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
