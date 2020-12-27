import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import *  as  products from './report-data';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  aggregates: any[];

  state: State = {
    skip: 0,
    take: 10
  };

  group: any;

  data: any;

  public gridData: any;

  constructor() {

  }

  ngOnInit() {

    this.aggregates = [{ field: 'UnitPrice', aggregate: 'average' }, { field: 'Discontinued', aggregate: 'count' }];
    this.group = [{ field: 'Discontinued', aggregates: this.aggregates }];
    this.data = products;
    this.gridData = process(this.data, this.state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {

    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }

    this.state = state;

    this.gridData = process(this.data, this.state);
  }

}
