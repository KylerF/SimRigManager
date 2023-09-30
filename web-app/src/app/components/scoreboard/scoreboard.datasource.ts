import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { LapTime, LapTimeState } from 'models/lap-time';
import { StateContainer } from 'models/state';
import { select, Store } from '@ngrx/store';

import { LapTimeQueryParams } from 'models/lap-time-filter-params';
import { LoadLaptimes } from 'store/actions/laptime.actions';
import { State, selectLaptimesState } from 'store/reducers';
import { Injectable } from '@angular/core';

/**
 * Data source for the Laptime table's virtual scroll.
 * @see https://material.angular.io/cdk/scrolling/overview
 */
@Injectable({
  providedIn: 'root',
})
export class LaptimeDataSource extends DataSource<LapTime | undefined> {
  private pageSize = 100;
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<(LapTime | undefined)[]>([]);
  private scrollSubscription = new Subscription();

  public state$: Observable<StateContainer<LapTimeState>>;

  /**
   * Subscribes to the store to get the laptimes and dispatches the action to load
   * the first page of laptimes.
   *
   * @param store passed in from the parent component
   * @param filterParams passed in from the parent component
   */
  constructor(private store: Store<State>, private filterParams: LapTimeQueryParams) {
    super();

    this.state$ = this.store.pipe(select(selectLaptimesState()));

    this.state$.subscribe((state) => {
      this.dataStream.next(state.state.laptimes);
    });

    this.fetchPage(0);
  }

  /**
   * Connects the data source to the collection viewer. This will trigger data fetching
   * as the user scrolls through the table.
   *
   * @param collectionViewer the collection viewer that will be using this data source
   * @returns an observable that emits a new value when the data changes
   */
  connect(collectionViewer: CollectionViewer): Observable<LapTime[] | undefined> {
    this.scrollSubscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end);

        for (let i = startPage; i <= endPage; i++) {
          this.fetchPage(i);
        }
      })
    );

    return this.dataStream;
  }

  /**
   * Disconnects the data source from the collection viewer and unsubscribes from the
   * store.
   */
  disconnect(): void {
    this.scrollSubscription.unsubscribe();
    this.state$ = null;
  }

  /**
   * Returns the page number for the given index.
   *
   * @param index the index of the item
   * @returns the page number
   */
  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  /**
   * Fetches a page of laptimes from the store.
   *
   * @param page the page number
   */
  private fetchPage(page: number) {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    // Update the offset and limit parameters
    this.filterParams = {
      ...this.filterParams,
      skip: page * this.pageSize,
      limit: this.pageSize,
    };

    // Dispatch the action to load the laptimes
    this.store.dispatch(LoadLaptimes({ params: this.filterParams }));
  }
}
