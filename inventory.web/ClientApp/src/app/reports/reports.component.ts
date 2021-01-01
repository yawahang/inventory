import { UtilityService } from 'src/core/service/utility.service';
import { CoreService } from './../../core/service/core.service';
import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { ReportService } from './report.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  aggregates: any[];

  state: State = {
    skip: 0,
    take: 20,
    group: []
  };

  group: any;
  data: any;
  gridData: any;

  fmReportParam: FormGroup;
  mvReportParam: MvReportParam = <MvReportParam>{};
  statusList: [];
  startDateMax = Date;
  endDateMin = Date;

  constructor(public fb: FormBuilder,
    private rs: ReportService,
    private cs: CoreService,
    private us: UtilityService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.fmReportParam = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Status: ['']
    });

    this.getStatusList();
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

  public dataStateChange(state: DataStateChangeEvent): void {

    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }

    this.state = state;

    this.gridData = process(this.data, this.state);
  }

  runReport() {

    this.rs.getReport(this.mvReportParam).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      if (response) {

        this.data = response;
      } else {

        this.us.openSnackBar('Failed to load report', 'error');
      }
    });

    this.aggregates = [{ field: 'UnitPrice', aggregate: 'average' }, { field: 'Discontinued', aggregate: 'count' }];
    this.gridData = process(this.data, this.state);
  }
}

export interface MvReportParam {
  startDate: Date;
  endDate: Date;
  status: number[];
}