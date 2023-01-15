import { HttpClient, HttpHeaders } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, take, timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ControllerSettings } from 'models/controller-settings';
import { WledMessage } from 'src/app/models/wled/wled-message';
import { Controller } from 'models/controller';
import { APIHelper } from 'helpers/api-helper';
import { State } from 'models/wled/state';
import { Driver } from 'models/driver';
@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve, add, update, delete, interact with and check
 * the status of WLED light controllers
 */
export class ControllerService {
  private endpoint = 'controllers';
  private settingsEndpoint = 'controllersettings';

  // All active websocket connections to controllers
  private connections:
    Map <
      number, WebSocketSubject<WledMessage>
    > = new Map <
      number, WebSocketSubject<WledMessage>
    > ();

  constructor(private http: HttpClient) { }

  /**
   * Get all configured WLED controllers
   *
   * @returns observable wrapping returned controller objects
   */
  getControllers(): Observable<Controller[]> {
    return this.http.get<Controller[]>(
      `${APIHelper.getBaseUrl()}/${this.endpoint}`
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Retrieve controller settings set by a driver
   *
   * @param controller controller to query settings
   * @param driver driver which set said settings
   * @returns observable expected to return the controller settings
   */
  getControllerSettings(controller: Controller, driver: Driver): Observable<ControllerSettings> {
    return this.http.get<ControllerSettings>(
      `${APIHelper.getBaseUrl()}/${this.endpoint}?controllerId=${controller.id}&driverId=${driver.id}`
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Check whether a given IP address is a valid and connected WLED
   * controller
   *
   * @param ipAddress the IP address of the controller to test
   * @returns promise expected to resolve as a WledState object
   */
  testIp(ipAddress: string): Observable<State> {
    return this.http.get<State>(
      `http://${ipAddress}/json/state`
    )
    .pipe(
      timeout(2000),
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Get the current state of a controller using its REST API.
   * This will return the controller's state, info, effects, and
   * palettes.
   *
   * @param controller the controller from which to retrieve state
   * @returns observable expected to return a WledState object
   */
  getControllerState(controller: Controller): Observable<WledMessage> {
    return this.http.get<WledMessage>(
      `http://${controller.ipAddress}/json`
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }

  getConnection(controller: Controller): WebSocketSubject<WledMessage> {
    if (this.connections.has(controller.id)) {
      // Return existing connection
      return this.connections.get(controller.id);
    }

    // Create new connection
    let ws = webSocket<WledMessage>(`ws://${controller.ipAddress}/ws`);
    this.connections.set(controller.id, ws);

    return ws;
  }

  /**
   * Disconnect from a controller websocket
   *
   * @param controller the controller to disconnect from
   */
  disconnectController(controller: Controller): void {
    if (this.connections.has(controller.id)) {
      this.connections.get(controller.id).unsubscribe();
      this.connections.delete(controller.id);
    }
  }

  /**
   * Get a websocket connection to a controller to subscribe to state changes,
   * and save it in the connections map to send commands to the controller
   *
   * @param controller the controller to connect to
   * @returns websocket connection
   */
  getStateStream(controller: Controller): Observable<WledMessage> {
    let ws = this.getConnection(controller);

    return ws;
  }

  /**
   * Toggle the power of a controller using a websocket connection
   *
   * @param controller the controller to toggle power
   * @returns observable expected to return the resulting state
   */
  togglePowerController(controller: Controller): Observable<WledMessage> {
    let connection = this.getConnection(controller);

    connection.next({
      on: !controller.state.on,
      v: true
    })

    return connection.pipe(
      take(1),
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Add a new controller
   *
   * @param controller the controller to add
   * @returns observable expected to return the added controller object
   */
  addController(controller: Controller): Observable<Controller> {
    return this.http.post<Controller>(
      `${APIHelper.getBaseUrl()}/${this.endpoint}`,
      controller
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Update an existing controller with new details
   *
   * @param controller the controller to update
   * @returns observable expected to return the updated controller object
   */
  updateController(controller: any): Observable<Controller> {
    return this.http.patch<Controller>(
      `${APIHelper.getBaseUrl()}/${this.endpoint}`,
      controller
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }

  /**
   * Update a controller settings profile with new details
   *
   * @param controller the settings to update
   * @returns observable expected to return the updated controller settings
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
   * @returns observable expected to return the deleted controller object
   */
  deleteController(controller: Controller): Observable<Controller | ArrayBuffer> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: controller
    };

    this.disconnectController(controller);

    return this.http.delete<Controller>(
      `${APIHelper.getBaseUrl()}/${this.endpoint}`,
      options
    )
    .pipe(
      catchError(APIHelper.handleError)
    );
  }
}
