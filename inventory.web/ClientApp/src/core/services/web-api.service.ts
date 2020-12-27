import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  post(url: string, body: any): Observable<any> {

    return this.http.post(this.apiUrl + url, body, { headers: this.getHeaderOptions() });
  }

  get(url: string, params?: any): Observable<any> {

    return this.http.get(this.apiUrl + url, { headers: this.getHeaderOptions(), params: params });
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
