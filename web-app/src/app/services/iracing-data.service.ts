import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { APIHelper } from '../_helpers/api-helper';

@Injectable({
  providedIn: 'root'
})

/**
 * Listens for incoming iRacing data from the API via a
 * websocket connection
 */
export class IracingDataService {
  endpoint = 'stream?raw=true';
  ws: WebSocket;

  /**
   * Connect to the API's websocket for streaming data
   * 
   * @returns an obervable wrapping incoming data
   */
  getStream(): Observable<any> {
    this.ws = new WebSocket(`${APIHelper.getBaseUrl('ws')}stream?raw=true`);

    return new Observable(
      observer => {
        this.ws.onmessage = (event) =>
          observer.next(event.data);

        this.ws.onerror = (event) => observer.error(event);

        this.ws.onclose = (event) => observer.complete();

        return () =>
          this.ws.close(1000, "The user disconnected");
      }
    );
  }
}
