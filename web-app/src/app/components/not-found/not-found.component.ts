import { longDelayedFadeIn } from 'animations/fades';
import { Component } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    animations: [longDelayedFadeIn],
    standalone: false
})

/**
 * Redirect here when a 404 is encountered
 */
export class NotFoundComponent {
  constructor() {}
}
