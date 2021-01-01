import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReportService } from './report.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    ExcelModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportsModule {

}
