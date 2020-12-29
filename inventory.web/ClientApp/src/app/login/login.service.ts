import { MvGetPost } from './../../core/model/base.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WebApiService } from 'src/core/service/web-api.service';

@Injectable()
export class LoginService {

  constructor(private api: WebApiService) {
  }

  login(param: MvGetPost): Observable<any> {

    return this.api.post('Account/Login', param);
  }

}
