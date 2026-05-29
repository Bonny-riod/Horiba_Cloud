import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DAY_DATA, WEEK_DATA, MONTH_DATA } from '../../../app/dummy-data/analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  getDayGraph() {
    return of(DAY_DATA.graph);
  }

  getWeekGraph() {
    return of(WEEK_DATA.graph);
  }

  getMonthGraph() {
    return of(MONTH_DATA.graph);
  }

  getDaySummary() {
    return of(DAY_DATA.table);
  }

  getWeekSummary() {
    return of(WEEK_DATA.table);
  }

  getMonthSummary() {
    return of(MONTH_DATA.table);
  }
}
