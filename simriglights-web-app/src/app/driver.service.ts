import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Driver } from './driver';
import { APIHelper } from './_helpers/api-helper';

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

  getSelectedDriver(): Observable<Driver> {
    return this.http.get<Driver>(APIHelper.baseUrl + this.activeDriverEndpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  selectDriver(driver: Driver) {
    return this.http.post<Driver>(
        APIHelper.baseUrl + this.activeDriverEndpoint, 
        driver
      )
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  addDriver(driver: Driver) {
    return this.http.post<Driver>(
      APIHelper.baseUrl + this.driversEndpoint, 
      driver
    )
    .pipe(retry(3), catchError(APIHelper.handleError));
  }
}
