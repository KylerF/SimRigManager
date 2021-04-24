import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Driver } from '../models/driver';
import { APIHelper } from '../_helpers/api-helper';
import { ActiveDriver } from '../models/active-driver';
import { NewDriver } from '../models/new-driver';

@Injectable({
  providedIn: 'root'
})

export class DriverService {
  driversEndpoint = 'drivers';
  activeDriverEndpoint = 'activedriver';

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(APIHelper.baseUrl + this.driversEndpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  getSelectedDriver(): Observable<ActiveDriver> {
    return this.http.get<ActiveDriver>(APIHelper.baseUrl + this.activeDriverEndpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  selectDriver(driver: Driver) {
    return this.http.post<ActiveDriver>(
        APIHelper.baseUrl + this.activeDriverEndpoint, 
        { 'driverId': driver.id }
      )
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  addDriver(driver: NewDriver): Observable<Driver> {
    return this.http.post<Driver>(
      APIHelper.baseUrl + this.driversEndpoint, 
      driver
    )
    .pipe(retry(3), catchError(APIHelper.handleError));
  }
}
