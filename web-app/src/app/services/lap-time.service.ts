import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { Observable } from 'rxjs';

import { APIHelper } from 'helpers/api-helper';
import { LapTime } from 'models/lap-time';
import { GET_LAPTIMES, SUBSCRIBE_TO_LAPTIMES } from '../graphql/queries/laptimes';

interface AllLapTimesResponse {
  laptimes: LapTime[]
}

interface NewLapTimeResponse {
  lapTime: LapTime
}
@Injectable({
  providedIn: 'root'
})
export class LapTimeGQL extends Query<AllLapTimesResponse> {
  document = GET_LAPTIMES;
}

@Injectable({
  providedIn: 'root'
})
export class LapTimeStreamGQL extends Query<NewLapTimeResponse> {
  document = SUBSCRIBE_TO_LAPTIMES;
}

/**
 * Service to retrieve best lap times from the API
 */
@Injectable({
  providedIn: 'root'
})
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
