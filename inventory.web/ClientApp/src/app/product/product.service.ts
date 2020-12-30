import { WebApiService } from 'src/core/service/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
@Injectable()
export class ProductService {

  constructor(private api: WebApiService) {

  }

  getProduct(param: object): Observable<any> {

    return this.api.get('Product/Product', param);
  }

  addProduct(param: object): Observable<any> {

    return this.api.post('Product/Insert', param);
  }

  updateProduct(param: object): Observable<any> {

    return this.api.post('Product/Update', param);
  }

}
