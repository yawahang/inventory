import { AuthService } from 'src/core/service/auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MvHttpOptions } from '../model/base.model';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private auth: AuthService) {

  }

  post(url: string, param: object): Observable<any> {

    return this.http.post(this.apiUrl + url, { Json: param }, { headers: this.getHeaderOptions() });
  }

  get(url: string, param: object): Observable<any> {

    const params = {} as MvHttpOptions;
    params.headers = this.getHeaderOptions();
    params.params = { Json: JSON.stringify(param) };
    return this.http.get(this.apiUrl + url, params);
  }

  getHeaderOptions(): HttpHeaders {

    const token = this.auth.getToken();
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
