import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { AvailabilityCheck } from '../models/availability-check';
import { APIHelper } from '../_helpers/api-helper';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to check whether the API is available
 */
export class AvailabilityService {
  endpoint = '';

  constructor(private http: HttpClient) { }

  getAPIAvailability() {
    return this.http.get<AvailabilityCheck>(APIHelper.getBaseUrl() + this.endpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }
}
