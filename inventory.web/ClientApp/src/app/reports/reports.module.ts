import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent
  }
];

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule,
    PDFModule,
    ExcelModule
  ]
})
export class ReportsModule {

}
