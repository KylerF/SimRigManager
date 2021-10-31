import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IracingDataFrame } from '../models/iracing/data-frame';
import { APIHelper } from '../_helpers/api-helper';

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
  ws: WebSocket;

  constructor(private http: HttpClient) {}

  /**
   * Request the latest data from the REST API
   * @returns an observable wrapping latest data
   */
  getLatest(): Observable<any> {
    return this.http.get<any>(APIHelper.getBaseUrl() + this.endpoint)
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Connect to the API's websocket for streaming data
   * 
   * @returns an obervable wrapping incoming data
   */
  getStream(): Observable<any> {
    this.ws = new WebSocket(`${APIHelper.getBaseUrl('ws')}${this.wsEndpoint}`);

    return new Observable(
      observer => {
        this.ws.onmessage = (event) =>
          observer.next(event.data);

        this.ws.onerror = (event) => observer.error(event);

        this.ws.onclose = (_) => observer.complete();

        return () =>
          this.ws.close(1000, "The user disconnected");
      }
    );
  }
}
