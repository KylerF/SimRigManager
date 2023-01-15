import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIHelper } from 'helpers/api-helper';
import { LapTime } from 'models/lap-time';
@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve best lap times from the API
 */
export class LapTimeService {
  private endpoint = 'laptimes';
  private streamEndpoint = 'laptimes/stream';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Fetch all lap times from the database
   *
   * @returns observable expected to return array of LapTimes
   */
  getLapTimes(): Observable<LapTime[]> {
    return this.http.get<LapTime[]>(
      `${APIHelper.getBaseUrl()}/${this.endpoint}`
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Stream lap times via Server Sent Events
   */
  streamLapTimes(): Observable<LapTime> {
    return new Observable<LapTime>(obs => {
      const eventSource = new EventSource(
        `${APIHelper.getBaseUrl()}/${this.streamEndpoint}`
      );

      eventSource.addEventListener('message', event => {
        let newLapTime: LapTime = JSON.parse(event.data);
        obs.next(newLapTime);
      });

      eventSource.addEventListener('error', event => {
        obs.error(event);
      });

      eventSource.addEventListener('close', event => {
        obs.complete();
      });

      return () => eventSource.close();
    });
  }
}
