import { DashboardService } from './dashboard.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UtilityService } from 'src/core/service/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  box: any;
  trendLine: any;
  donutChart: any;
  dashboardConfig: any;

  constructor(private ds: DashboardService,
    private us: UtilityService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this.dashboardConfig = environment.dashboardConfig;
    this.getDashboard();
  }

  getDashboard() {

    this.ds.getDashboard().pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      if (response) {

        this.box = response?.BoxTile || {};
        this.trendLine = this.createChartDefination(response?.TrendChart || {}, 'line');
        this.donutChart = this.createChartDefination(response?.DonutChart || {}, 'donut');
      } else {

        this.us.openSnackBar('Failed to load dashboard', 'error');
      }
    });
  }

  createChartDefination(chart: any, type: string): any {

    const xAxisDataType = chart.dataType[chart.XAxis] ? chart.dataType[chart.XAxis].toLowerCase() : null;
    const yAxisDataType = chart.dataType[chart.YAxis] ? chart.dataType[chart.YAxis].toLowerCase() : null;

    const seriesFormat: string = (this.dashboardConfig['format'] || {})[yAxisDataType] || null;
    const xAxisFormat: string = (this.dashboardConfig['format'] || {})[xAxisDataType] || null;

    const data = chart.Data;
    const categories: any[] = [...new Set(data.map((dta: any) => dta[chart.XAxis].toString()))];

    if (['line', 'column', 'bar'].includes(chart.Type)) {

      const seriesData: any[] = chart.Series;
      chart.Data = {};
      chart.Data['Series'] = [];

      seriesData.forEach(series => {

        chart.Data['Series'].push({
          Name: series,
          Field: chart.YAxis, // value field
          Format: seriesFormat,
          Data: data.filter((fil: any) => fil[chart.SeriesField] === series).map((dt: any) => {

            if (xAxisDataType === 'date') {

              const d = dt;
              d[chart.XAxis] = this.us.toJsDate(d[chart.XAxis], 'JsDate');
              return d;

            } else {

              return dt;
            }
          })
        });
      });

    } else if (['pie', 'donut'].includes(chart.Type)) {

      chart.Data = chart.Data;
      chart.Format = seriesFormat;
    }

    // category axis settings 
    if (categories && categories[0]) {

      let maxAxisDivisions: number;

      if (categories.length <= 7) {

        maxAxisDivisions = this.dashboardConfig.maxAxisDivisions.weeks;

      } else if (categories.length > 7 && categories.length <= 32) {

        maxAxisDivisions = this.dashboardConfig.maxAxisDivisions.months;

      } else if (categories.length > 32 && categories.length <= 60) {

        maxAxisDivisions = this.dashboardConfig.maxAxisDivisions.twoMonths;

      } else if (categories.length > 60 && categories.length <= 180) {

        maxAxisDivisions = this.dashboardConfig.maxAxisDivisions.sixMonths;

      } else if (categories.length > 180) {

        maxAxisDivisions = this.dashboardConfig.maxAxisDivisions.year;
      }

      let min: any = categories[(categories.length - maxAxisDivisions)] || null;
      let max: any = categories[categories.length] || null;
      if (min && max) {

        min = ['date', 'datetime', 'time'].includes(xAxisDataType) ? this.us.toJsDate(min.toString(), 'JsDate')
          : xAxisDataType === 'number' ? Number(min.toString()) :
            ['decimal', 'money'].includes(xAxisDataType) ? parseFloat(min.toString()) : min;

        max = ['date', 'datetime', 'time'].includes(xAxisDataType) ? this.us.toJsDate(max.toString(), 'JsDate')
          : xAxisDataType === 'number' ? Number(max.toString()) :
            ['decimal', 'money'].includes(xAxisDataType) ? parseFloat(max.toString()) : max;
      }

      if (['line', 'column'].includes(chart.Type)) {

        chart.CategoryAxis = { min: min, max: max, labels: { rotation: 'auto', format: xAxisFormat }, maxDivisions: maxAxisDivisions };
        chart.Pannable = { lock: 'y' };
        chart.Zoomable = { mousewheel: { lock: 'y' }, selection: { lock: 'y' } };

      } else if (['bar'].includes(chart.Type)) {

        chart.CategoryAxis = { min: min, max: max, labels: { rotation: 'auto', format: xAxisFormat }, maxDivisions: maxAxisDivisions };
        chart.Pannable = { lock: 'x' };
        chart.Zoomable = { mousewheel: { lock: 'x' }, selection: { lock: 'x' } };

      } else {

        chart.CategoryAxis = { labels: { rotation: 'auto', format: xAxisFormat } };
        chart.Pannable = false;
        chart.Zoomable = false;
      }
    } else {

      chart.CategoryAxis = { labels: { rotation: 'auto', format: xAxisFormat } };
      chart.Pannable = false;
      chart.Zoomable = false;
    }

    return chart;
  }

  getTop = (i: any) => {
    return i ? -45 : -35;
  }

  ngOnDestroy() {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
