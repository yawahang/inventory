import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/service/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private api: WebApiService) {

  }

  getReport(param: object): Observable<any> {

    return this.api.get('Report/Report', param);
  }
}
