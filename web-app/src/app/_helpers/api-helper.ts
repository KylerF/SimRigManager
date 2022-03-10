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
   * @param protocol either http or ws
   * @returns URL to the API
   */
  static getBaseUrl(protocol: string = 'http'): string {
    let url = `${protocol}://127.0.0.1:8000/`;

    if(environment.production) {
      url = `${protocol}://${window.location.hostname}:8000/`;
    }

    return url;
  }

  /**
   * Get the base URL for the mock API
   *
   * @param protocol either http or ws
   * @returns URL to the mock API
   */
  static getMockBaseUrl(protocol: string = 'http'): string {
    return `${protocol}://127.0.0.1:8001/`;
  }

  /**
   * Catch any error response and return it to the caller
   *
   * @param error the error returned from API
   * @returns the error
   */
  static handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  /**
   * Get a link to the iRacing SDK documentation for the given key
   *
   * @param key the key to get the link for - if not provided, returns
   *            the base documentation URL
   * @returns a link to the iRacing SDK documentation for the given key
   */
  static getSdkDocLink(key: string = ''): string {
    return `https://sajax.github.io/irsdkdocs/telemetry/${key ? `${key.toLowerCase()}.html` : ''}`;
  }
}
