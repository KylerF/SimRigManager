import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { HourglassIconComponent } from './hourglass-icon/hourglass-icon.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { QuoteComponent } from './quote/quote.component';
import { DriverAvatarComponent } from './driver-avatar/driver-avatar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ErrorMessageComponent,
    HourglassIconComponent,
    LoadingSpinnerComponent,
    QuoteComponent,
    DriverAvatarComponent,
  ],
  exports: [
    ErrorMessageComponent,
    HourglassIconComponent,
    LoadingSpinnerComponent,
    QuoteComponent,
    DriverAvatarComponent,
  ],
})
export class SharedComponentsModule {}
