import { environment } from './../../environments/environment';
import { UtilityService } from 'src/core/service/utility.service';
import { CoreService } from './../../core/service/core.service';
import { Component, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GroupDescriptor, process, SortDescriptor, State } from '@progress/kendo-data-query';
import { GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ReportService } from './report.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;

  @ViewChild('reportGrid', { static: false }) private reportGrid: GridComponent;

  pageSize: number;
  rowHeight: number;
  data = [];
  gridView = { total: 0, data: [] };
  skip = 0;
  take: number;
  filter: any;
  loading: boolean;
  sort: SortDescriptor[];
  aggregates: any[];
  groups: GroupDescriptor[];

  fmReportParam: FormGroup;
  mvReportParam: MvReportParam = <MvReportParam>{};
  statusList: [];
  startDateMax = Date;
  endDateMin = Date;

  constructor(public fb: FormBuilder,
    private rs: ReportService,
    private cs: CoreService,
    private us: UtilityService,
    private ngZone: NgZone,
    private renderer: Renderer2) {

    this._unsubscribeAll = new Subject();
    this.allData = this.allData.bind(this);
    renderer.listen('window', 'resize', () => this.updateRowHeight());
    this.pageSize = environment.report.pageSize || 100;
    this.take = this.pageSize;
  }

  ngOnInit() {

    this.aggregates = [{ field: 'Stock', aggregate: 'sum' }, { field: 'Price', aggregate: 'sum' }];
    this.groups = [{ field: 'Status', aggregates: this.aggregates }];
    this.fmReportParam = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Status: ['']
    });

    this.getStatusList();
  }

  updateRowHeight() {  // change row height for given media
    this.rowHeight = window.matchMedia('(max-width: 576px)').matches ? 156 : 37;
  }

  groupChange(groups: GroupDescriptor[]): void {

    this.loading = true;
    this.groups = groups;
    this.loadGridData();
  }

  fitColumns() { // autofit grid columns

    this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {

      if (this.reportGrid) {

        this.reportGrid.autoFitColumns();
      }
    });
  }

  sortChange(sort: SortDescriptor[]) {

    this.loading = true;
    this.sort = sort;
    this.loadGridData();
  }

  onColumnReorder(co: any) {

  }

  onColumnResize(cr: any) {

  }

  filterChange(filter: any) {

    this.loading = true;
    this.filter = filter;
    this.loadGridData();
  }

  pageChange(event: PageChangeEvent) {

    this.loading = true;
    this.skip = event.skip;
    this.take = event.take; // event.take fetch all available rows on pdF export 
    this.loadGridData();
  }

  allData(): ExcelExportData {

    const result: ExcelExportData = {
      data: process(this.data, { group: this.groups, sort: this.sort, filter: this.filter }).data,
      group: this.groups
    };

    return result;
  }

  loadGridData() {

    const state = { skip: this.skip, take: this.take };
    if (this.groups && this.groups.length > 0) {
      state['group'] = this.groups;
    }

    if (this.sort && this.sort.length > 0) {
      state['sort'] = this.sort;
    }

    if (this.filter && this.filter.filters && this.filter.filters.length > 0) {
      state['filter'] = this.filter;
    }

    this.gridView = process(this.data.slice(), state);

    setTimeout(() => {  // for syncronizing the code process for loader

      this.fitColumns(); // auto fit columns initially only for SpreadsheetReport (it doesnt have column width)
      this.loading = false;
    }, 300);
  }

  startDateInput(e: any) {

    if (e) {

      this.endDateMin = e.value;
    }
  }

  endDateInput(e: any) {

    if (e) {

      this.startDateMax = e.value;
    }
  }

  getStatusList() {

    this.cs.getListItem({ Category: 'ProductStatus' }).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      if (response) {

        this.statusList = response;
      } else {

        this.statusList = [];
      }
    });
  }

  runReport() {

    this.us.formUtility(this.fmReportParam, 'validate')
    if (!this.fmReportParam.valid) {

      this.us.openSnackBar('Invalid Parameters', 'warning');
      return;
    }

    this.mvReportParam.status = this.mvReportParam?.status || [];
    this.rs.getReport(this.mvReportParam).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      if (response) {

        this.data = response;
      } else {

        this.data = [];
        this.us.openSnackBar('Failed to load report', 'error');
      }

      this.loadGridData();
    });
  }
}

export interface MvReportParam {
  startDate: Date;
  endDate: Date;
  status: number[];
}