import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursMinutesSeconds',
  standalone: false,
})

/**
 * Pipe to convert a time value in seconds to HH:MM:SS
 */
export class HoursMinutesSecondsPipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 60 / 60);
    const minutes: number = Math.floor(value / 60 - hours * 60);
    const seconds: number = Math.floor(value - hours * 60 * 60 - minutes * 60);

    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    );
  }
}
