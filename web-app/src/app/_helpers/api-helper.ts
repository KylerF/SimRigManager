import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

/**
 * A simple helper class to provide the API base URL
 * to services and handle errors
 */
export class APIHelper {
  /**
   * Get the base URL for the SimRig API
   *
   * @param protocol either http or ws
   * @returns URL to the API
   */
  static getBaseUrl(protocol: string = 'http'): string {
    return `${protocol}://${window.location.hostname}:8000`;
  }

  /**
   * Get the base URL for the mock API
   *
   * @param protocol either http or ws
   * @returns URL to the mock API
   */
  static getMockBaseUrl(protocol: string = 'http'): string {
    return `${protocol}://${window.location.hostname}:8001`;
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
   * Get a link to the iRacing SDK documentation for the given YAML key
   *
   * @param key the key to get the link for - if not provided, returns
   *            the base documentation URL
   * @returns a link to the iRacing SDK documentation for the given key
   */
  static getSdkDocLink(key: string = ''): string {
    return `https://sajax.github.io/irsdkdocs/telemetry/${key ? `${key.toLowerCase()}.html` : ''}`;
  }
}
