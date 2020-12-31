import { UtilityService } from '../../core/service/utility.service';
import { ProductService } from './product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MvProduct } from './product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  displayedColumns: string[] = ['productId', 'product', 'description', 'price', 'stock', 'company', 'brand', 'status', 'createdBy'];
  dataSource: MatTableDataSource<MvProduct>;
  gridData: MvProduct[] = [];
  selectedProduct: MvProduct = <MvProduct>{};
  selection = new SelectionModel<MvProduct>(false, []);

  constructor(private ps: ProductService,
    public dialog: MatDialog,
    private us: UtilityService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.getProducts();
  }

  getProducts() {

    this.ps.getProduct({}).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      if (response) {

        this.gridData = response;
        this.dataSource = new MatTableDataSource<MvProduct>(this.gridData);
      } else {

        this.gridData = [];
        this.dataSource = new MatTableDataSource<MvProduct>();
      }
    });
  }

  addProduct() {

    this.selection.clear();
    this.selectedProduct = <MvProduct>{};
    this.openDialog('Add');
  }

  editProduct() {

    this.openDialog('Edit');
  }

  openDialog(action: string) {

    if (action === 'Edit' && !this.selection.hasValue()) {

      this.us.openSnackBar('Please select a row to edit product', 'info');
      return;
    }

    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '40vw',
      data: { data: { ...this.selectedProduct }, action: action }
    });

    dialogRef.afterClosed().subscribe(response => {

      if (response) {

        this.selectedProduct = response;

        if (action === 'Edit') {

          this.us.swapArrayObject(response, this.gridData, 'productId');
        } else {

          this.gridData.unshift(response);
        }

        this.dataSource = new MatTableDataSource<MvProduct>(this.gridData);
      }
    });
  }

  rowClick(e: any, row: MvProduct) {

    this.selectedProduct = { ...row };
    this.selection.toggle(row);
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
