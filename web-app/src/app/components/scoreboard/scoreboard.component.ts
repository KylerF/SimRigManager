import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, take } from 'rxjs';
import { LapTime } from 'models/lap-time';
import { Driver } from 'models/driver';
import { Store } from '@ngrx/store';

import { LapTimeQueryParams, SortOrder } from 'src/app/models/lap-time-filter-params';

import { LaptimeDataSource } from './scoreboard.datasource';
import { State, selectActiveDriver } from 'store/reducers';

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
  activeDriver$: Observable<Driver>;
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

  searchColumn = 'driverName';
  searchText: string = '';
  searchTextChanged: Subject<string> = new Subject<string>();
  sortColumn: string;
  sortOrder: string;

  loading: boolean = true;
  error: any;

  datasource: LaptimeDataSource;

  constructor(private store: Store<State>) {
    // Debounce the search input
    this.searchTextChanged
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((inputText) => {
        this.searchText = inputText;
        this.filterScores();
      });
  }

  ngOnInit() {
    this.activeDriver$ = this.store.select(selectActiveDriver);
    this.datasource = new LaptimeDataSource(this.store, this.filterParams);
  }

  ngOnDestroy() {
    // Stop the laptime stream
    this.datasource.disconnect();
  }

  /**
   * Filter scores with the current parameters
   */
  filterScores() {
    // Reset filter params to default
    this.filterParams = {
      ...this.filterParams,
      where: { overallBestOnly: true },
    };

    // Add overall/personal best filter
    if (this.showFilter == 'overall') {
      this.filterParams.where.overallBestOnly = true;
    } else {
      this.filterParams.where.overallBestOnly = false;

      // Add driver filter
      this.activeDriver$.pipe(take(1)).subscribe((driver) => {
        this.filterParams.where.driverId = {
          eq: driver.id,
        };
      });
    }

    // Add search filter
    if (this.searchText) {
      this.filterParams.where[this.searchColumn] = {
        contains: this.searchText,
      };
    }

    this.datasource.disconnect();
    this.datasource = new LaptimeDataSource(this.store, this.filterParams);
  }

  searchInput() {
    this.searchTextChanged.next(this.searchText);
  }

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

      this.datasource.disconnect();
      this.datasource = new LaptimeDataSource(this.store, this.filterParams);
    }
  }
}
