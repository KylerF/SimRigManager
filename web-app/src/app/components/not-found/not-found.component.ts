import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'], 
  animations: [
    trigger('longDelayedFade', [      
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1s 200ms ease-in', style({ opacity: 1 })),
      ])
    ])
  ]
})

/**
 * Redirect here when a 404 is encountered
 */
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
