import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LapTime } from '../models/lap-time';
import { APIHelper } from '../_helpers/api-helper';

@Injectable({
  providedIn: 'root'
})

export class LapTimeService {
  endpoint = 'scores';
  constructor(private http: HttpClient) { }

  getLapTimes(): Observable<LapTime[]> {
    return this.http.get<LapTime[]>(APIHelper.getBaseUrl() + this.endpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }
}
