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

/**
 * Service to retrieve, add and update drivers
 */
export class DriverService {
  driversEndpoint = 'drivers';
  activeDriverEndpoint = 'activedriver';

  constructor(private http: HttpClient) { }

  /**
   * Fetch all drivers
   * 
   * @returns array of drivers
   */
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(APIHelper.baseUrl + this.driversEndpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  /**
   * Get the currently selected driver
   * 
   * @returns the active driver
   */
  getSelectedDriver(): Observable<ActiveDriver> {
    return this.http.get<ActiveDriver>(APIHelper.baseUrl + this.activeDriverEndpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  /**
   * Set the active driver
   * 
   * @param driver the driver to activate
   * @returns the activated driver, if successful
   */
  selectDriver(driver: Driver) {
    return this.http.post<ActiveDriver>(
        APIHelper.baseUrl + this.activeDriverEndpoint, 
        { 'driverId': driver.id }
      )
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  /**
   * Create a new driver
   * 
   * @param driver the driver to add
   * @returns the new driver, if added successfully
   */
  addDriver(driver: NewDriver): Observable<Driver> {
    return this.http.post<Driver>(
      APIHelper.baseUrl + this.driversEndpoint, 
      driver
    )
    .pipe(retry(3), catchError(APIHelper.handleError));
  }
}
