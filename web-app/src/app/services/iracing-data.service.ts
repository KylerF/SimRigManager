import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { catchError, delay, retryWhen, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';

import { APIHelper } from 'helpers/api-helper';
import { IracingDataFrame } from 'models/iracing/data-frame';

@Injectable({
  providedIn: 'root',
})

/**
 * Listens for incoming iRacing data from the API via a
 * websocket connection
 */
export class IracingDataService {
  private endpoint = 'iracing/latest';
  private wsEndpoint = 'iracing/stream';

  private wsSubscription: Subscription;

  // Holds the latest data returned from the API - can be subscribed to by
  // any component that needs it
  private _latestData = new BehaviorSubject<IracingDataFrame>(null);
  latestData$ = this._latestData.asObservable();

  // Holds subscribable iRacing connection status. Connected means:
  // 1: The websocket connection is active
  // 2: Valid iRacing data is being received
  private _connected = new BehaviorSubject<boolean>(false);
  connected$ = this._connected.asObservable();

  // Whether the websocket connection is open -
  // used to prevent multiple connections
  private streamOpen: boolean = false;

  constructor(private http: HttpClient) {}

  /**
   * Request the latest data from the REST API
   *
   * @returns an observable wrapping latest data
   */
  getLatest(): Observable<IracingDataFrame> {
    let url = `${APIHelper.getBaseUrl()}/${this.wsEndpoint}`;

    // If we're in the development environment, use the mock API
    if (isDevMode()) {
      url = `${APIHelper.getMockBaseUrl()}/${this.wsEndpoint}`;
    }

    return this.http.get<any>(`${url}/${this.endpoint}`).pipe(catchError(APIHelper.handleError));
  }

  /**
   * Get the current iRacing connection status
   */
  getConnectionStatus(): Observable<boolean> {
    return this.connected$;
  }

  /**
   * Connect to the API's websocket for streaming data using the rxjs
   * websocket implementation. The shared subscription is updated as
   * new data is received.
   */
  startStream() {
    if (this.streamOpen) {
      // Stream already running, do nothing
      return;
    }

    this.streamOpen = true;

    let url = `${APIHelper.getBaseUrl('ws')}/${this.wsEndpoint}`;

    // If we're in the development environment, use the mock API
    if (isDevMode()) {
      url = `${APIHelper.getMockBaseUrl('ws')}/${this.wsEndpoint}`;
    }

    this.wsSubscription = webSocket(url)
      .pipe(
        retryWhen((error) =>
          error.pipe(
            // Retry connection every 3 seconds on error
            tap((err) => {
              this._connected.next(false);
              this._latestData.next(null);
            }),
            delay(3000)
          )
        )
      )
      .subscribe((response: IracingDataFrame) => {
        this._connected.next(true);
        this._latestData.next(response);
      });
  }

  /**
   * Close the websocket connection
   */
  stopStream() {
    this._latestData.next(null);
    this.wsSubscription.unsubscribe();
    this.streamOpen = false;
    this._connected.next(false);
  }
}
