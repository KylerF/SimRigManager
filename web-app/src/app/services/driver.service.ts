import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Mutation, Query, Subscription } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Driver, DriverAvatar } from 'models/driver';
import { DriverStats } from 'models/driver-stats';
import { APIHelper } from 'helpers/api-helper';
import { NewDriver } from 'models/new-driver';
import {
  SUBSCRIBE_TO_ACTIVE_DRIVER,
  GET_ALL_DRIVERS,
  SELECT_DRIVER,
} from 'graphql/queries/drivers';

interface ActiveDriverResponse {
  activeDriver: Driver;
}

interface AllDriversResponse {
  drivers: Driver[];
}

interface SetActiveDriverResponse {
  setActiveDriver: Driver;
}

@Injectable({
  providedIn: 'root',
})
export class ActiveDriverGQL extends Subscription<ActiveDriverResponse> {
  document = SUBSCRIBE_TO_ACTIVE_DRIVER;
}

@Injectable({
  providedIn: 'root',
})
export class DriversGQL extends Query<AllDriversResponse> {
  document = GET_ALL_DRIVERS;
}

@Injectable({
  providedIn: 'root',
})
export class SelectDriverGQL extends Mutation<SetActiveDriverResponse> {
  document = SELECT_DRIVER;
}

/**
 * Service to connect to the Drivers API, providing CRUD operations
 * and caching functionality for driver profiles
 */
@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private _selectedDriver = new BehaviorSubject<Driver>(null);
  selectedDriver$ = this._selectedDriver.asObservable();

  private localStorage: Storage;
  private eventSource: EventSource;

  private driversEndpoint = 'drivers';
  private activeDriverEndpoint = 'drivers/active';
  private streamEndpoint = 'drivers/active/stream';
  private profilePicEndpoint = 'avatars';
  private statsEndpoint = 'stats';

  constructor(private http: HttpClient) {
    if (this.checkLocalStorageSupported()) {
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
    return this.http
      .get<Driver[]>(`${APIHelper.getBaseUrl()}/${this.driversEndpoint}`)
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Get the currently selected driver
   *
   * @returns the active driver
   */
  getSelectedDriver(): Observable<Driver> {
    return this.http
      .get<Driver>(`${APIHelper.getBaseUrl()}/${this.activeDriverEndpoint}`)
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Stream lap times via an EventSource
   */
  streamSelectedDriver(): EventSource {
    this.eventSource = new EventSource(`${APIHelper.getBaseUrl()}/${this.streamEndpoint}`);

    this.eventSource.addEventListener('message', (event) => {
      this._selectedDriver.next(JSON.parse(event.data));
    });

    this.eventSource.addEventListener('error', () => {
      catchError(APIHelper.handleError);
    });

    return this.eventSource;
  }

  /**
   * Get the currently selected driver
   *
   * @param driverId ID of the driver for which to query stats
   * @returns the active driver
   */
  getDriverStats(driverId: number): Observable<DriverStats> {
    return this.http
      .get<DriverStats>(
        `${APIHelper.getBaseUrl()}/${this.driversEndpoint}/${driverId}/${this.statsEndpoint}`
      )
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Notify subscribers of a driver change, and save the driver to
   * local storage
   *
   * @param driver the driver to cache
   */
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

    return this.http
      .post<Driver>(`${APIHelper.getBaseUrl()}/${this.activeDriverEndpoint}`, {
        driverId: driver.id,
      })
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Create a new driver
   *
   * @param driver the driver to add
   * @returns the new driver, if added successfully
   */
  addDriver(driver: NewDriver): Observable<Driver> {
    return this.http
      .post<Driver>(`${APIHelper.getBaseUrl()}/${this.driversEndpoint}`, driver)
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Update driver details
   *
   * @param driver driver to update
   * @returns the updated driver
   */
  updateDriver(driver: Driver): Observable<Driver> {
    return this.http
      .patch<Driver>(`${APIHelper.getBaseUrl()}/${this.driversEndpoint}`, driver)
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Delete a driver profile and its data.
   *
   * WARNING: This will cascade to all settings and lap times set by the
   * driver, so use it wisely.
   *
   * @param driver the driver to delete
   * @returns the driver's data, for the last time ever
   */
  deleteDriver(driver: Driver): Observable<Driver> {
    return this.http
      .delete<Driver>(`${APIHelper.getBaseUrl()}/${this.driversEndpoint}/${driver.id}`)
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Upload a new profile pic for a driver
   *
   * @param driverId unique ID for the driver being updated
   * @param profilePic the new profile pic
   * @returns result of the upload
   */
  uploadProfilePic(driverId: number, profilePic: File): Observable<DriverAvatar> {
    var formData: FormData = new FormData();
    formData.append('profile_pic', profilePic);

    return this.http
      .post<DriverAvatar>(
        `${APIHelper.getBaseUrl()}/${this.profilePicEndpoint}/${driverId}`,
        formData
      )
      .pipe(catchError(APIHelper.handleError));
  }

  /**
   * Get URL to the profile pic for a driver. If the driver has no
   * profile pic, return the default avatar.
   *
   * @param driver the driver to retrieve avatar for
   * @returns the avatar URL
   */
  getAvatarURLForDriver(driver: Driver) {
    if (!driver?.profilePic) {
      return '';
    }

    return `${APIHelper.getBaseUrl()}${driver.profilePic}`;
  }

  /**
   * Check whether HTML5 local storage is supported
   *
   * @returns true if supported, false otherwise
   */
  private checkLocalStorageSupported() {
    return typeof Storage !== void 0;
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
   * Save the active driver to local storage
   *
   * @returns true if successful, false otherwise
   */
  private saveToLocalStorage(): boolean {
    if (this.checkLocalStorageSupported()) {
      this.localStorage.setItem('activeDriver', JSON.stringify(this._selectedDriver.getValue()));

      return true;
    }

    return false;
  }
}
