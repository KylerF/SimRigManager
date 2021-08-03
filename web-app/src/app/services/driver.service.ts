import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private _selectedDriver = new BehaviorSubject<ActiveDriver>(null);
  selectedDriver$ = this._selectedDriver.asObservable();

  isLocalStorageSupported: boolean;
  localStorage: Storage;
  
  driversEndpoint = 'drivers';
  activeDriverEndpoint = 'activedriver';

  constructor(private http: HttpClient) { 
    this.checkLocalStorageSupported();

    if(this.isLocalStorageSupported) {
      this.localStorage = window.localStorage;
      this._selectedDriver.next(this.getFromLocalStorage() || null);
    }
  }

  /**
   * Fetch all drivers
   * 
   * @returns array of drivers
   */
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(
      APIHelper.getBaseUrl() + this.driversEndpoint
    )
    .pipe(
      retry(3), 
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Get the currently selected driver
   * 
   * @returns the active driver
   */
  getSelectedDriver(): Observable<ActiveDriver> {
    return this.http.get<ActiveDriver>(
      APIHelper.getBaseUrl() + this.activeDriverEndpoint
    )
    .pipe(
      retry(3), 
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Set the active driver
   * 
   * @param driver the driver to activate
   * @returns the activated driver, if successful
   */
  selectDriver(driver: Driver) {
    this._selectedDriver.next({driver: driver});
    this.saveToLocalStorage();

    return this.http.post<ActiveDriver>(
      APIHelper.getBaseUrl() + this.activeDriverEndpoint, 
      { 'driverId': driver.id }
    )
    .pipe(
      retry(3), 
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Create a new driver
   * 
   * @param driver the driver to add
   * @returns the new driver, if added successfully
   */
  addDriver(driver: NewDriver): Observable<Driver> {
    return this.http.post<Driver>(
      APIHelper.getBaseUrl() + this.driversEndpoint, 
      driver
    )
    .pipe(
      retry(3), 
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Check whether HTML5 local storage is supported. If it is not, 
   * cart items will be stored in the session.
   */
  private checkLocalStorageSupported() {
    this.isLocalStorageSupported = (typeof(Storage) !== void(0));
  }

  /**
   * Retrieve the cart from local storage
   * 
   * @returns 
   */
  private getFromLocalStorage() {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem('activeDriver'));
    }

    return null;
  }
  
  /**
   * Save the cart in local storage
   */
  private saveToLocalStorage(): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem('activeDriver', JSON.stringify(this._selectedDriver.getValue()));
      return true;
    }

    return false;
  }
}
