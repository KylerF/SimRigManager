import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { NewController } from 'models/new-controller';
import { APIHelper } from 'helpers/api-helper';
import { Controller } from 'models/controller';
import { WledState } from 'models/wled/wled-state';
import { WledInfo } from 'models/wled/wled-info';
import { ControllerSettings } from '../models/controller-settings';
import { Driver } from 'models/driver';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve, add, interact with and check the status of
 * WLED light controllers
 */
export class ControllerService {
  private endpoint = 'controllers';
  private settingsEndpoint = 'controllersettings';

  // Flag to enable power on/off (allowed only once per second to avoid
  // spamming the controller)
  powerEnabled = true;

  private wledRequestOptions: Object = {
    responseType: 'text'
  }

  constructor(private http: HttpClient) { }

  /**
   * Get all configured WLED controllers
   *
   * @returns observable wrapping returned controller objects
   */
  getControllers(): Observable<Controller[]> {
    return this.http.get<Controller[]>(`${APIHelper.getBaseUrl()}/${this.endpoint}`)
      .pipe(
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Retrieve controller settings set by a driver
   *
   * @param controller controller to query settings
   * @param driver driver which set said settings
   *
   * @returns promise expected to resolve as controller settings
   */
  getControllerSettings(controller: Controller, driver: Driver): Observable<ControllerSettings> {
    return this.http.get<ControllerSettings>(
      `${APIHelper.getBaseUrl()}/${this.endpoint}?controllerId=${controller.id}&driverId=${driver.id}`)
        .pipe(
          catchError(APIHelper.handleError)
        )
  }

  /**
   * Check whether a given IP address is a valid and connected WLED
   * controller
   *
   * @param ipAddress the IP address of the controller to test
   *
   * @returns promise expected to resolve as a WledState object
   */
  testIp(ipAddress: string): Observable<WledState> {
    return this.http.get<any>(`http://${ipAddress}/json/state`)
      .pipe(
        timeout(2000),
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Get the current state of a controller
   *
   * @param controller the controller from which to retrieve state
   * @returns promise expected to resolve as a WledState object
   */
  getControllerState(controller: Controller): Observable<WledState> {
    return this.http.get<WledState>(`http://${controller.ipAddress}/json/state`)
      .pipe(
        timeout(2000),
        catchError(APIHelper.handleError)
      )
  }

  /**
   * Get all available WLED effects
   *
   * @param controller controller to query effects from
   *
   * @returns promise expected to resolve as an array of strings (effect names)
   */
  getControllerEffects(controller: Controller): Observable<[string]> {
    return this.http.get<[string]>(`http://${controller.ipAddress}/json/effects`)
      .pipe(
        timeout(2000),
        catchError(APIHelper.handleError)
      )
  }

  getControllerInfo(controller: Controller): Observable<WledInfo> {
    return this.http.get<WledInfo>(`http://${controller.ipAddress}/json/info`)
      .pipe(
        timeout(2000),
        catchError(APIHelper.handleError)
      )
  }

  /**
   * Power on a controller via a request to the WLED API
   *
   * @param controller the controller to power on
   *
   * @returns promise expected to resolve as the result
   */
  powerOnController(controller: Controller): Observable<any> {
    if (!this.powerEnabled) {
      return of({});
    }

    this.disablePowerFor(1);

    return this.http.get<any>(`http://${controller.ipAddress}/win&T=1`, this.wledRequestOptions)
      .pipe(
        timeout(2000),
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Power off a controller via a request to the WLED API
   *
   * @param controller the controller to power on
   *
   * @returns promise expected to resolve as the result
   */
  powerOffController(controller: Controller): Observable<any> {
    if (!this.powerEnabled) {
      return of({});
    }

    this.disablePowerFor(1);

    return this.http.get<any>(`http://${controller.ipAddress}/win&T=0`, this.wledRequestOptions)
      .pipe(
        timeout(2000),
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Toggle the power of a controller via a request to the WLED API
   *
   * @param controller the controller to toggle power
   * @returns promise expected to resolve as the result
   */
  togglePowerController(controller: Controller): Observable<any> {
    if (!this.powerEnabled) {
      return of({});
    }

    this.disablePowerFor(1);

    return this.http.get<any>(`http://${controller.ipAddress}/win&T=2`, this.wledRequestOptions)
      .pipe(
        timeout(2000),
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Add a new controller
   *
   * @param controller the controller to add
   */
  addController(controller: NewController): Observable<Controller> {
    return this.http.post<Controller>(`${APIHelper.getBaseUrl()}/${this.endpoint}`, controller)
      .pipe(
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Update an existing controller with new details
   *
   * @param controller the controller to update
   */
  updateController(controller: any): Observable<Controller> {
    return this.http.patch<Controller>(`${APIHelper.getBaseUrl()}/${this.endpoint}`, controller)
      .pipe(
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Update a controller settings profile with new details
   *
   * @param controller the settings to update
   */
  updateControllerSettings(controllerSettings: any): Observable<ControllerSettings> {
    return this.http.patch<ControllerSettings>(
      `${APIHelper.getBaseUrl()}/${this.settingsEndpoint}`,
      controllerSettings
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Delete an existing controller
   *
   * @param controller the controller to delete
   */
  deleteController(controller: Controller): Observable<Controller | ArrayBuffer> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: controller
    };

    return this.http.delete<Controller>(`${APIHelper.getBaseUrl()}/${this.endpoint}`, options)
      .pipe(
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Enforce wait period between power commands
   *
   * @param seconds amount of time to wait in seconds
   */
  private disablePowerFor(seconds: number) {
    this.powerEnabled = false;

    setTimeout(() => {
      this.powerEnabled = true;
    }, seconds * 1000);
  }
}
