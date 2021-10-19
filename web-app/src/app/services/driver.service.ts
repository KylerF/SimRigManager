import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APIHelper } from '../_helpers/api-helper';
import { NewDriver } from '../models/new-driver';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve, add and update drivers
 */
export class DriverService {
  private _selectedDriver = new BehaviorSubject<Driver>(null);
  selectedDriver$ = this._selectedDriver.asObservable();

  localStorage: Storage;
  
  driversEndpoint = 'drivers';
  activeDriverEndpoint = 'drivers/active';
  profilePicEndpoint = 'avatars';

  constructor(private http: HttpClient) { 
    if(this.checkLocalStorageSupported()) {
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
     `${APIHelper.getBaseUrl()}${this.driversEndpoint}`
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
  getSelectedDriver(): Observable<Driver> {
    return this.http.get<Driver>(
      `${APIHelper.getBaseUrl()}${this.activeDriverEndpoint}`
    )
    .pipe(
      retry(3), 
      catchError(APIHelper.handleError)
    );
  }

  setCachedDriver(driver: Driver) {
    this._selectedDriver.next(driver);
    this.saveToLocalStorage();
  }

  /**
   * Set the active driver
   * 
   * @param driver the driver to activate
   * @returns the activated driver, if successful
   */
  selectDriver(driver: Driver) {
    this.setCachedDriver(driver);

    return this.http.post<Driver>(
      `${APIHelper.getBaseUrl()}${this.activeDriverEndpoint}`, 
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
      `${APIHelper.getBaseUrl()}${this.driversEndpoint}`, 
      driver
    )
    .pipe(
      retry(3), 
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Update driver details
   * 
   * @param driver driver to update
   * @returns the updated driver
   */
  updateDriver(driver: Driver): Observable<Driver> {
    return this.http.patch<Driver>(
      `${APIHelper.getBaseUrl()}${this.driversEndpoint}`, 
      driver
    )
    .pipe(
      catchError(APIHelper.handleError)
    )
  }

  /**
   * Upload a new profile pic for a driver
   * 
   * @param driverId unique ID for the driver being updated
   * @param profilePic the new profile pic
   * @returns status of the upload
   */
  uploadProfilePic(driverId: number, profilePic: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("profile_pic", profilePic);

    return this.http.post<any>(
      `${APIHelper.getBaseUrl()}${this.profilePicEndpoint}/${driverId}`, 
      formData
    )
    .pipe(
      catchError(APIHelper.handleError)
    )
  }

  /**
   * Check whether HTML5 local storage is supported
   */
  private checkLocalStorageSupported() {
    return (typeof(Storage) !== void(0));
  }

  /**
   * Retrieve the active driver from local storage
   * 
   * @returns active driver or null
   */
  private getFromLocalStorage() {
    if (this.checkLocalStorageSupported()) {
      return JSON.parse(this.localStorage.getItem('activeDriver'));
    }

    return null;
  }
  
  /**
   * Save the active driver in local storage
   */
  private saveToLocalStorage(): boolean {
    if (this.checkLocalStorageSupported()) {
      this.localStorage.setItem('activeDriver', JSON.stringify(this._selectedDriver.getValue()));
      return true;
    }

    return false;
  }
}
