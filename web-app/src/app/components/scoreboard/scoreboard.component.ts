import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LapTime } from 'models/lap-time';

import { LapTimeQueryParams, SortOrder } from 'src/app/models/lap-time-filter-params';

import { LaptimeDataSource } from './scoreboard.datasource';
import { State } from 'store/reducers';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * Component to render the scoreboard table
 */
export class ScoreboardComponent implements OnInit, OnDestroy {
  newLapTimeStream: Observable<LapTime>;

  filterParams: LapTimeQueryParams = {
    where: {
      overallBestOnly: true,
    },
    order: {
      setAt: SortOrder.DESC,
    },
    limit: 100,
  };

  showFilter = 'overall';
  timeFilter = 'forever';

  searchColumn = 'driver';
  searchText: string = '';
  sortColumn: string;
  sortOrder: string;

  loading: boolean = true;
  error: any;

  datasource: LaptimeDataSource;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.datasource = new LaptimeDataSource(this.store, this.filterParams);
  }

  ngOnDestroy() {
    // Stop the laptime stream
    this.datasource.disconnect();
  }

  /**
   * Show best overall lap times
   */
  showOverallBestTimes() {}

  /**
   * Show best lap times for the active driver
   */
  showDriverBestTimes() {}

  /**
   * Filter scores with a given condition
   */
  filterScores() {}

  /**
   * Sort scores by the given column
   */
  sortScores(column: string, order: string = SortOrder.ASC) {
    if (order == 'toggle') {
      this.filterParams = {
        ...this.filterParams,
        order: {
          [column]:
            this.filterParams.order[column] == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC,
        },
      };
    }
  }
}
