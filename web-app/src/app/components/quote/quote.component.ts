import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoadQuote } from 'store/actions/quote.actions';
import { State, selectQuote } from 'store/reducers';
import { Quote } from 'models/quote';
import { StateContainer } from 'models/state';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})

/**
 * Component to display an inspirational racing quote.
 * Included in the home component.
 */
export class QuoteComponent implements OnInit {
  quote$: Observable<StateContainer<Quote>>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.quote$ = this.store.select(selectQuote);
    this.getRandomQuote();
  }

  getRandomQuote() {
    this.store.dispatch(LoadQuote());
  }
}
