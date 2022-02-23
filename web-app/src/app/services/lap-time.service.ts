import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
      APIHelper.getBaseUrl() + this.endpoint
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }
}
