import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { APIHelper } from '../_helpers/api-helper';
import { webSocket } from 'rxjs/webSocket'
import { IracingDataFrame } from '../models/iracing/data-frame';

@Injectable({
  providedIn: 'root'
})

/**
 * Listens for incoming iRacing data from the API via a
 * websocket connection
 */
export class IracingDataService {
  endpoint = 'latest';
  wsEndpoint = 'stream?raw=true';

  constructor(private http: HttpClient) {}

  /**
   * Request the latest data from the REST API
   * @returns an observable wrapping latest data
   */
  getLatest(): Observable<any> {
    return this.http.get<any>(APIHelper.getMockBaseUrl() + this.endpoint)
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Connect to the API's websocket for streaming data using the rxjs
   * websocket implementation. This should automatically reconnect.
   *
   * @returns an obervable wrapping incoming data
   */
  getStream(): Observable<IracingDataFrame> {
    let subject = webSocket(
      `${APIHelper.getMockBaseUrl('ws')}${this.wsEndpoint}`
    );

    return subject.pipe(
      retry<IracingDataFrame>(),
      catchError(APIHelper.handleError)
    );
  }
}
