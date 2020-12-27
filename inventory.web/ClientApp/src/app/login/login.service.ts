import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable()
export class LoginService {

  constructor(private api: WebApiService) {
  }

  login(json: any): Observable<any> {

    return this.api.post('Account/Login', json);
  }

}
