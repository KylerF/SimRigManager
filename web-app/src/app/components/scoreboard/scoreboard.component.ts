import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  State,
  selectLaptimesState,
  selectAllLaptimes
} from 'store/reducers';

import { LoadLaptimes, StreamLaptimes, StopStreamLaptimes } from 'src/app/store/actions/laptime.actions';
import { DriverService } from 'services/driver.service';
import { StateContainer } from 'src/app/models/state';
import { select, Store } from '@ngrx/store';
import { LapTime } from 'models/lap-time';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})

/**
 * Component to render the scoreboard table
 */
export class ScoreboardComponent implements OnInit, OnDestroy {
  lapTimes: LapTime[] = [];
  filteredLapTimes: LapTime[] = [];

  laptimesState$: Observable<StateContainer<LapTime[]>>;
  filteredLaptimes$: Observable<LapTime[]>;

  newLapTimeStream: Observable<LapTime>;

  showFilter = 'overall';
  timeFilter = 'forever';

  searchColumn = 'driver';
  searchText: string = '';
  sortColumn: string;
  sortOrder: string;

  loading: boolean = true;
  error: any;

  constructor(
    private driverService: DriverService,
    private store: Store<State>
  )
  { }

  ngOnInit(): void {
    // Get laptimes from the API
    this.getLapTimes();
  }

  ngOnDestroy(): void {
    // Stop the new laptime stream
    this.store.dispatch(StopStreamLaptimes());
  }

  /**
   * Fetch all lap times from the API
   */
  getLapTimes() {
    // Get all lap times
    this.store.dispatch(LoadLaptimes({
      params: {
        limit: 1000
      }
    }));

    // And subscribe to new ones
    this.store.dispatch(StreamLaptimes());

    this.laptimesState$ = this.store.pipe(
      select(
        selectLaptimesState()
      )
    );
    this.filteredLaptimes$ = this.store.pipe(
      select(
        selectAllLaptimes()
      )
    );
  }

  /**
   * Show best overall lap times
   */
  showOverallBestTimes() {
    this.filteredLapTimes = this.lapTimes.filter(lapTime =>
      lapTime.time == Math.min(...this.lapTimes.filter(cLapTime =>
        cLapTime.car == lapTime.car
        && cLapTime.trackName == lapTime.trackName
        && cLapTime.trackConfig == lapTime.trackConfig
      ).map(fLapTime => fLapTime.time))
    );
  }

  /**
   * Show best lap times for the active driver
   */
  showDriverBestTimes() {
    this.driverService.selectedDriver$.subscribe(activeDriver => {
      this.filteredLapTimes = this.lapTimes.filter(lapTime =>
        lapTime.driver.id == activeDriver.id
      );
    });
  }

  /**
   * Filter scores with a given condition
   */
  filterScores() {
    // Switch view based on overall/personal best selection
    if (this.showFilter == 'overall') {
      this.showOverallBestTimes();
    } else {
      this.showDriverBestTimes();
    }

    // Get the selected time range
    let startDate = moment(0);
    let endDate = moment().add(1, 'days');;

    if (this.timeFilter == 'today') {
      startDate = moment().startOf('day');
    } else if (this.timeFilter == 'week') {
      startDate = moment().startOf('week');
    } else if (this.timeFilter == 'month') {
      startDate = moment().startOf('month');
    } else if (this.timeFilter == 'threemonths') {
      startDate = moment().subtract(3, 'months');
    } else if (this.timeFilter == 'sixmonths') {
      startDate = moment().subtract(6, 'months');
    } else if (this.timeFilter == 'year') {
      startDate = moment().startOf('year');
    }

    if (this.searchText.length > 0) {
      if (this.searchColumn == 'driver') {
        this.filteredLapTimes = this.filteredLapTimes.filter(lapTime =>
          lapTime.driver.name.toLocaleLowerCase().includes(
            this.searchText.trim().toLocaleLowerCase()
          )
        );
      } else {
        this.filteredLapTimes = this.filteredLapTimes.filter(lapTime =>
          lapTime[this.searchColumn].toLocaleLowerCase().includes(
            this.searchText.trim().toLocaleLowerCase()
          )
        );
      }
    }

    this.filteredLapTimes = this.filteredLapTimes.filter(lapTime =>
      moment(lapTime.setAt).isBetween(startDate, endDate)
    );
  }

  /**
   * Sort scores by the given column
   */
  sortScores(column: string, order: string = 'asc') {
    if (order == 'toggle') {
      order = (column == this.sortColumn ? (this.sortOrder == 'desc' ? 'asc' : 'desc') : column == 'setAt' ? 'desc': 'asc')
    }

    this.sortColumn = column;
    this.sortOrder = order;

    this.filteredLapTimes.sort((lapTime1, lapTime2) => {
      if (column == 'driver') {
        return order == 'desc' ?
          (lapTime2.driver.name > lapTime1.driver.name ? 1 : lapTime2.driver.name < lapTime1.driver.name ? -1 : 0) :
          (lapTime1.driver.name > lapTime2.driver.name ? 1 : lapTime1.driver.name < lapTime2.driver.name ? -1 : 0);
      } else {
        return order == 'desc' ?
          (lapTime2[column] > lapTime1[column] ? 1 : lapTime2[column] < lapTime1[column] ? -1 : 0) :
          (lapTime1[column] > lapTime2[column] ? 1 : lapTime1[column] < lapTime2[column] ? -1 : 0);
      }
    });
  }
}
