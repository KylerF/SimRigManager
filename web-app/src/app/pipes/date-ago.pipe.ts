import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to convert a unix date to 'x seconds/minutes/hours/days... ago' statement
 */
@Pipe({
  name: 'dateAgo',
  pure: true,
  standalone: false,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: Date, args?: any): any {
    if (value) {
      const date = new Date(value);
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      const dateUTC = new Date(date.getTime() - timezoneOffset);

      const seconds = Math.floor((+new Date() - +dateUTC) / 1000);
      if (seconds < 30)
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now';

      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };

      let counter;

      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return `${counter} ${i} ago`; // singular (1 day ago)
          } else {
            return `${counter} ${i}s ago`; // plural (2 days ago)
          }
        }
      }
    }

    return value;
  }
}
