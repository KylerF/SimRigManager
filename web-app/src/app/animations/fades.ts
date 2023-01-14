import { trigger, transition, style, animate } from "@angular/animations";

/**
 * Ease-in with no delay and 250ms duration
 */
export const shortFadeIn = trigger('shortFadeIn', [
  transition('void => *', [
    style({ opacity: 0.2 }),
    animate('250ms ease-in', style({ opacity: 1 })),
  ])
]);

/**
 * Ease-in with 250ms delay and 1s duration
 */
export const longDelayedFadeIn = trigger('longDelayedFadeIn', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('1s 200ms ease-in', style({ opacity: 1 })),
  ])
]);
