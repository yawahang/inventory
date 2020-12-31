import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';
import { ProductService } from './product.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UtilityService } from 'src/core/service/utility.service';
import { MatSelectModule } from '@angular/material/select';
import { CoreService } from 'src/core/service/core.service';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CdkTableModule,
    MatSelectModule,
    MatDividerModule
  ],
  declarations: [
    ProductComponent,
    ProductFormComponent
  ],
  providers: [
    ProductService,
    UtilityService,
    CoreService
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule {

}
