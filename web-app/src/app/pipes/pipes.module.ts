import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoursMinutesSecondsPipe } from './hours-minutes-seconds.pipe';
import { DateAgoPipe } from './date-ago.pipe';

@NgModule({
  declarations: [HoursMinutesSecondsPipe, DateAgoPipe],
  imports: [CommonModule],
  exports: [HoursMinutesSecondsPipe, DateAgoPipe],
})
export class SharedPipesModule {}
