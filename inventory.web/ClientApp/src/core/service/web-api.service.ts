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

  constructor(private http: HttpClient) {

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

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST');
    headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type');
    return headers;
  }
}
