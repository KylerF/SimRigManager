import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SseClient } from 'angular-sse-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LapTime } from '../models/lap-time';
import { APIHelper } from '../_helpers/api-helper';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve best lap times from the API
 */
export class LapTimeService {
  endpoint = 'scores';
  streamEndpoint = 'streamlaptimes';

  constructor(
    private http: HttpClient, 
    private sseClient: SseClient
  ) { }

  /**
   * Fetch all lap times from the database
   * 
   * @returns observable expected to return array of LapTimes
   */
  getLapTimes(): Observable<LapTime[]> {
    return this.http.get<LapTime[]>(
      APIHelper.getBaseUrl() + this.endpoint
    )
    .pipe(
      retry(3), 
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Stream new lap times in real time
   * 
   * @returns observable which streams new lap times
   */
  streamNewLapTimes(): Observable<LapTime> {
    return this.sseClient.get(
      `${APIHelper.getBaseUrl()}${this.streamEndpoint}`
    );
  }
}
