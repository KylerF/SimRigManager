import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIHelper } from '../_helpers/api-helper';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {
  endpoint = 'randomquote';
  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<Quote> {
    return this.http.get<Quote>(APIHelper.getBaseUrl() + this.endpoint)
      .pipe(retry(3), catchError(APIHelper.handleError));
  }
}
