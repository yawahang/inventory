import { WebApiService } from 'src/core/service/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MvGetOptions, MvGetPost } from 'src/core/model/base.model';
@Injectable()
export class ProductService {

  constructor(private api: WebApiService) {

  }

  getProduct(param?: MvGetPost): Observable<any> {

    return this.api.get('Product/Product', param);
  }

  addProduct(param: MvGetPost): Observable<any> {

    return this.api.post('Product/Insert', param);
  }

  updateProduct(param: MvGetPost): Observable<any> {

    return this.api.post('Product/Update', param);
  }

}
