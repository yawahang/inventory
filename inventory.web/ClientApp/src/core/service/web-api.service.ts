import { UtilityService } from 'src/core/services/utility.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MvGetOptions, MvGetPost, MvPostOptions } from '../model/base.model';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  post(url: string, param: MvGetPost): Observable<any> {

    const params = this.paramJson(param, 'POST');
    return this.http.post(this.apiUrl + url, { Json: params }, { headers: this.getHeaderOptions() });
  }

  get(url: string, param: MvGetPost): Observable<any> {

    const params = this.paramJson(param, 'GET');
    return this.http.get(this.apiUrl + url, { headers: this.getHeaderOptions(), params: { Json: JSON.stringify(params) } });
  }

  getHeaderOptions(): HttpHeaders {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST');
    headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type');
    return headers;
  }

  /*
    * Create Parameter Json from Object sent With Dynamic Type
  */
  paramJson(param: MvGetPost, method: string = 'GET'): object {

    try {

      if (method === 'GET') {

        let paramGet: MvGetOptions = {} as MvGetOptions;
        paramGet.pagination = param.pagination || {};
        paramGet.filter = param.filter || [];

        Object.keys(param.data).forEach((key) => {

          if (key) {

            paramGet.filter.push({
              field: key,
              value: param[key]
            });
          }
        });

        return paramGet;
      } else {

        type MapSchemaTypes = {
          string: string;
          integer: number;
          boolean: boolean;
          float: number;
          date: Date;
          number: number;
          regexp: RegExp;
        }
        type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
          -readonly [K in keyof T]: MapSchemaTypes[T[K]]
        }
        // function asSchema<T extends Record<string, keyof MapSchemaTypes>>(t: T): T {
        //   return t;
        // }

        const postModelSchema: any = {};
        Object.keys(param.data).forEach((key) => {
          postModelSchema[key] = typeof param[key];
        });

        type PostModel = MapSchema<typeof postModelSchema>;
        let paramPost: MvPostOptions<PostModel> = {} as MvPostOptions<PostModel>;
        paramPost.pagination = param.pagination || {};
        paramPost.filter = param.filter || [];

        Object.keys(param.data).forEach((key) => {
          paramPost.filter.push({
            field: key,
            value: param.data[key],
            operator: 'equals'
          });
        });

        return paramPost;
      }
    } catch (e) {

      console.log('WebApiService => parseJson()', e);
    }
  }

}
