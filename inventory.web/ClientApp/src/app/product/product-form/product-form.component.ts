import { ProductService } from './../product.service';
import { CoreService } from 'src/core/service/core.service';
import { AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvProduct } from '../product.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilityService } from 'src/core/service/utility.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, AfterViewInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  action: string;
  selectedProduct: MvProduct = <MvProduct>{};
  productForm: FormGroup;
  statusList: [];

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public cs: CoreService,
    public ps: ProductService,
    private us: UtilityService) {

    this._unsubscribeAll = new Subject();

    dialogRef.disableClose = true;
    this.action = data?.action;
    this.selectedProduct = data?.data || {};
  }

  ngOnInit() {

    this.productForm = this.fb.group({
      Product: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      Stock: ['', Validators.required],
      Company: ['', Validators.required],
      StatusListItemId: ['', Validators.required]
    });

    this.getStatusList();
  }

  cancelClick() {

    this.us.openSnackBar('Action Cancelled', 'warning');
    this.dialogRef.close();
  }

  submitForm() {

    if (this.productForm.valid) {

      const param = {
        data: { ...this.selectedProduct },
        pagination: {},
        filter: []
      };

      this.ps.addProduct(param).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

        if (response && response?.data) {

          this.dialogRef.close(response?.data);
          this.us.openSnackBar('Product added', 'success');
        } else {

          this.dialogRef.close({ error: true });
          this.us.openSnackBar('Failed to add product', 'error');
        }
      });
    }
  }

  getStatusList() {

    const param = {
      data: { Category: 'ProductStatus' },
      pagination: {},
      filter: []
    };

    this.cs.getListItem(param).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      if (response) {

        this.statusList = response;
      } else {

        this.statusList = [];
      }
    });
  }

  ngAfterViewInit() {

    this.productForm.updateValueAndValidity();
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
