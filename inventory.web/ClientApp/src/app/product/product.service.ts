import { WebApiService } from 'src/core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ProductService {

  constructor(private api: WebApiService) {

  }

  addProduct(json: any): Observable<any> {

    return this.api.get('Account/AddProduct', { json: JSON.stringify(json) });
  }

  updateProduct(json: any): Observable<any> {

    return this.api.get('Account/UpdateProduct', { json: JSON.stringify(json) });
  }

  getProduct(): Observable<any> {

    return this.api.get('Account/Product');
  }

}
