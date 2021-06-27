import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { NewController } from '../models/new-controller';
import { APIHelper } from '../_helpers/api-helper';
import { Controller } from '../models/controller';
import { WledState } from '../models/wled/wled-state';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve, add, interact with and check the status of 
 * WLED light controllers
 */
export class ControllerService {
  endpoint = 'controllers';

  // Flag to enable power on/off (allowed only once per second to avoid 
  // spamming the controller)
  powerEnabled = true;
  
  constructor(private http: HttpClient) { }

  /**
   * Get all configured WLED controllers
   * 
   * @returns observable wrapping returned controller objects
   */
  getControllers(): Observable<Controller[]> {    
    return this.http.get<Controller[]>(`${APIHelper.getBaseUrl()}${this.endpoint}`)
      .pipe(
        retry(3), 
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Check whether a connection can be established to a controller. This
   * endpoint just returns an empty object, but will error if the controller
   * is offline.
   * 
   * @param controller the controller to test
   * @returns promise expected to resolve as an empty object
   */
  getControllerStatus(controller: Controller): Observable<any> {
    return this.http.get<any>(`http://${controller.ipAddress}/api`)
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
   * Power on a controller via a request to the WLED API
   * 
   * @param controller the controller to power on
   * @returns promise expected to resolve as the result
   */
  powerOnController(controller: Controller): Observable<any> {
    if (!this.powerEnabled) {
      return of({});
    }

    this.disablePowerFor(1);

    return this.http.get<any>(`http://${controller.ipAddress}/win&T=1`)
      .pipe(
        timeout(2000), 
        catchError(APIHelper.handleError)
      );
  }

  /**
   * Power off a controller via a request to the WLED API
   * 
   * @param controller the controller to power on
   * @returns promise expected to resolve as the result
   */
  powerOffController(controller: Controller): Observable<any> {
    if (!this.powerEnabled) {
      return of({});
    }

    this.disablePowerFor(1);

    return this.http.get<any>(`http://${controller.ipAddress}/win&T=0`)
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

    return this.http.get<any>(`http://${controller.ipAddress}/win&T=2`)
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
    return this.http.post<Controller>(`${APIHelper.getBaseUrl()}${this.endpoint}`, controller)
      .pipe(
        retry(3), 
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
    
    return this.http.delete<Controller>(`${APIHelper.getBaseUrl()}${this.endpoint}`, options)
      .pipe(
        retry(3), 
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
