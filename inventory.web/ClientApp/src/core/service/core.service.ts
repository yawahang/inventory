import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MvGetPost } from '../model/base.model';
import { WebApiService } from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private api: WebApiService) {

  }

  getListItem(param: MvGetPost): Observable<any> {

    return this.api.get('Core/ListItem', param);
  }
}
