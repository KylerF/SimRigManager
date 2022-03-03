import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIHelper } from 'helpers/api-helper';
import { Quote } from 'models/quote';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve a random quote from the API
 */
export class QuoteService {
  endpoint = 'quotes/random';
  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<Quote> {
    return this.http.get<Quote>(`${APIHelper.getBaseUrl()}${this.endpoint}`)
      .pipe(catchError(APIHelper.handleError));
  }
}
