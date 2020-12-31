import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WebApiService } from 'src/core/service/web-api.service';

@Injectable()
export class DashboardService {

  constructor(private api: WebApiService) {

  }

  getDashboard(param?: object): Observable<any> {

    return this.api.get('Dashboard/Dashboard', param);
  }
}
