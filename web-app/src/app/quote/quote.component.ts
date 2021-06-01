import { Quote } from '../models/quote';
import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})

/**
 * Component to display an inspirational racing quote.
 * Included in the scoreboard component.
 */
export class QuoteComponent implements OnInit {
  quote: Quote;
  error: string;

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.getRandomQuote();
  }

  getRandomQuote() {
    this.quoteService.getRandomQuote().subscribe(
      response => {
        // Success! Sort by set date by default.
        this.quote = response;
      },
      error => {
        // Failed. Save the response.
        this.error = error;
      }
    );
  }

}
