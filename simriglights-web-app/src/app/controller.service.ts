import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Controller } from './controller';
import { APIHelper } from './_helpers/api-helper';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve and update config options
 */
export class ControllerService {
  endpoint = 'controllers';
  
  constructor(private http: HttpClient) { }

  getControllers(): Observable<Controller[]> {    
    return this.http.get<Controller[]>(APIHelper.baseUrl + this.endpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }
}
