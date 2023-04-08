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

  constructor(private store: Store<State>, private filterParams: LapTimeQueryParams) {
    super();

    this.state$ = this.store.pipe(select(selectLaptimesState()));

    this.state$.subscribe((state) => {
      this.dataStream.next(state.state.laptimes);
    });

    this.fetchPage(0);
  }

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

  disconnect(): void {
    this.scrollSubscription.unsubscribe();
    this.state$ = null;
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number) {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    this.filterParams = {
      ...this.filterParams,
      skip: page * this.pageSize,
      limit: this.pageSize,
    };

    this.store.dispatch(LoadLaptimes({ params: this.filterParams }));
  }
}
