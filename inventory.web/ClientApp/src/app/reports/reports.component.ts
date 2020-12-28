import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  aggregates: any[];

  state: State = {
    skip: 0,
    take: 20,
    group: []
  };

  group: any;
  data: any;
  gridData: any;

  constructor() {

  }

  ngOnInit() {

    this.aggregates = [{ field: 'UnitPrice', aggregate: 'average' }, { field: 'Discontinued', aggregate: 'count' }];
    this.getReportData();
    this.gridData = process(this.data, this.state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {

    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }

    this.state = state;

    this.gridData = process(this.data, this.state);
  }

  getReportData() {

    this.data = [{
      'ProductID': 1,
      'ProductName': 'Chai',
      'UnitPrice': 18.0000,
      'Discontinued': true
    }, {
      'ProductID': 2,
      'ProductName': 'Chang',
      'UnitPrice': 19.0000,
      'Discontinued': false
    }, {
      'ProductID': 3,
      'ProductName': 'Aniseed Syrup',
      'UnitPrice': 10.0000,
      'Discontinued': false
    }, {
      'ProductID': 4,
      'ProductName': "Chef Anton\'s Cajun Seasoning",
      'UnitPrice': 22.0000,
      'Discontinued': false
    }, {
      'ProductID': 5,
      'ProductName': "Chef Anton\'s Gumbo Mix",
      'UnitPrice': 21.3500,
      'Discontinued': false
    }, {
      'ProductID': 6,
      'ProductName': "Grandma\'s Boysenberry Spread",
      'UnitPrice': 25.0000,
      'Discontinued': false
    }, {
      'ProductID': 7,
      'ProductName': "Chai",
      'UnitPrice': 22.0000,
      'Discontinued': true
    },
    {
      'ProductID': 8,
      'ProductName': 'Chai1',
      'UnitPrice': 18.0000,
      'Discontinued': true
    }, {
      'ProductID': 9,
      'ProductName': 'Chang1',
      'UnitPrice': 19.0000,
      'Discontinued': false
    }, {
      'ProductID': 10,
      'ProductName': 'Aniseed Syrup1',
      'UnitPrice': 10.0000,
      'Discontinued': false
    }, {
      'ProductID': 11,
      'ProductName': "Cajun Seasoning",
      'UnitPrice': 22.0000,
      'Discontinued': false
    }, {
      'ProductID': 12,
      'ProductName': "Gumbo Mix",
      'UnitPrice': 21.3500,
      'Discontinued': false
    }, {
      'ProductID': 13,
      'ProductName': "Boysenberry Spread",
      'UnitPrice': 25.0000,
      'Discontinued': false
    }, {
      'ProductID': 14,
      'ProductName': "Chai3",
      'UnitPrice': 22.0000,
      'Discontinued': true
    }];
  }
}
