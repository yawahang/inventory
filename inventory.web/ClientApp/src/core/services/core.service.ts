import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private api: WebApiService) {

  }

  getListItem(json: any): Observable<any> {

    return this.api.get('Core/ListItem', JSON.stringify(json));
  }
}
