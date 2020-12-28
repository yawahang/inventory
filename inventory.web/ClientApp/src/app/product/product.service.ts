import { WebApiService } from 'src/core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ProductService {

  constructor(private api: WebApiService) {

  }

  addProduct(json: any): Observable<any> {

    return this.api.post('Product/Insert', json);
  }

  updateProduct(json: any): Observable<any> {

    return this.api.post('Product/Update', json);
  }

  getProduct(): Observable<any> {

    return this.api.get('Product/Product');
  }
}
