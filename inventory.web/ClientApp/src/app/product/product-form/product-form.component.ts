import { CoreService } from 'src/core/services/core.service';
import { AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvProduct } from '../product.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    public cs: CoreService) {

    this._unsubscribeAll = new Subject();

    dialogRef.disableClose = true;
    this.action = data.action;
    this.selectedProduct = data.data || {};
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

    this.dialogRef.close();
  }

  submitForm() {

    this.dialogRef.close(this.selectedProduct);
  }

  getStatusList() {

    this.cs.getListItem({ Category: 'ProductStatus' })
      .pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

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
