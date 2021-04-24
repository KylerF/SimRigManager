import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Controller } from '../models/controller';
import { APIHelper } from '../_helpers/api-helper';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve and update config options
 */
export class ControllerService {
  endpoint = 'controllers';
  
  constructor(private http: HttpClient) { }

  /**
   * Get all configured WLED controllers
   * 
   * @returns observable wrapping returned controller objects
   */
  getControllers(): Observable<Controller[]> {    
    return this.http.get<Controller[]>(APIHelper.baseUrl + this.endpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }

  /**
   * Check whether a connection can be established to a controller. This
   * endpoint just returns an empty object, but will error if the controller
   * is offline.
   * 
   * @param controller the controller to test
   */
  getControllerStatus(controller: Controller): Observable<any> {
    return this.http.get<any>('http://' + controller.ipAddress + '/api')
      .pipe(retry(3), catchError(APIHelper.handleError));
  }
}
