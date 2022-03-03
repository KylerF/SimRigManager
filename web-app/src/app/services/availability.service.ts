import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { AvailabilityCheck } from 'models/availability-check';
import { APIHelper } from 'helpers/api-helper';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to check whether the API is available
 */
export class AvailabilityService {
  private endpoint = '';

  constructor(private http: HttpClient) { }

  getAPIAvailability() {
    return this.http.get<AvailabilityCheck>(APIHelper.getBaseUrl() + this.endpoint)
      .pipe(catchError(APIHelper.handleError));
  }
}
