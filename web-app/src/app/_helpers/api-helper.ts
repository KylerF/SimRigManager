import { environment } from '../../environments/environment';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

/**
 * A simple helper class to provide the API base URL
 * to services and handle errors
 */
export class APIHelper {
    static baseUrl: string = (environment.production ? 'http://192.168.1.200:8000/' : 'http://127.0.0.1:8000/');

    /**
     * Catch any error response and return it to the caller
     * 
     * @param error the error returned from API
     * @returns the error
     */
    static handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}
