import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private api: WebApiService) {

  }

  getListItem(param: object): Observable<any> {

    return this.api.get('Core/ListItem', param);
  }
}
