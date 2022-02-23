import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { catchError, delay, retryWhen, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket'

import { APIHelper } from '../_helpers/api-helper';
import { IracingDataFrame } from '../models/iracing/data-frame';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

/**
 * Listens for incoming iRacing data from the API via a
 * websocket connection
 */
export class IracingDataService {
  private endpoint = 'latest';
  private wsEndpoint = 'stream?raw=true';

  private wsSubscription: Subscription;

  // Holds the latest data returned from the API - can be accessed by
  // any component that needs it
  private _latestData = new BehaviorSubject<IracingDataFrame>(null);
  latestData$ = this._latestData.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Request the latest data from the REST API
   * @returns an observable wrapping latest data
   */
  getLatest(): Observable<IracingDataFrame> {
    return this.http.get<any>(`${APIHelper.getMockBaseUrl()}${this.endpoint}`)
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Connect to the API's websocket for streaming data using the rxjs
   * websocket implementation. The shared subscription is updated as
   * new data is received.
   */
  startStream() {
    if (this._latestData.getValue() != null) {
      // Stream already running, do nothing
      return;
    }

    let url = `${APIHelper.getBaseUrl('ws')}${this.wsEndpoint}`;

    // If we're in the development environment, use the mock API
    if (isDevMode()) {
      url = `${APIHelper.getMockBaseUrl('ws')}${this.wsEndpoint}`;
    }

    this.wsSubscription = webSocket(url).pipe(
      retryWhen(error => error.pipe(
        // Retry connection every 3 seconds on error
        tap(err => {
          this._latestData.next(null);
        }),
        delay(3000)
      ))
    )
    .subscribe(
      (response: IracingDataFrame) => {
        if (!_.isEmpty(response)) {
          this._latestData.next(response);
        } else {
          this._latestData.next(response);
        }
      }
    );
  }

  /**
   * Close the websocket connection
   */
  stopStream() {
    this._latestData.next(null);
    this.wsSubscription.unsubscribe();
  }
}
