import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

/**
 * A simple helper class to provide the API base URL
 * to to services
 */
export class APIHelper {
    static baseUrl: string = 'http://127.0.0.1:8000/';

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