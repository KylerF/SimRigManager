import { environment } from '../../environments/environment';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

/**
 * A simple helper class to provide the API base URL
 * to services and handle errors
 */
export class APIHelper {
    /**
     * We can use localhost in development, but in production
     * the server's IP address must be determined.
     * 
     * @returns URL to the API
     */
    static getBaseUrl(): string {
        let url = 'http://127.0.0.1:8000/';

        if(environment.production) {
            url = `http://${window.location.hostname}:8000/`;
        }

        console.log(url);

        return url
    }

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
