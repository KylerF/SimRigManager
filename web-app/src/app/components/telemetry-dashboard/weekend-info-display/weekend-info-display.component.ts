import { Component } from '@angular/core';
import * as _ from 'lodash';

import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from '../../../services/iracing-data.service';

@Component({
  selector: 'app-weekend-info-display',
  templateUrl: './weekend-info-display.component.html',
  styleUrls: ['./weekend-info-display.component.scss']
})
export class WeekendInfoDisplayComponent extends BaseTelemetryDisplayComponent {
  eventType: string;
  track: string;
  config: string;

  constructor (iracingDataService: IracingDataService){
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the weekend info.
   * The component will attempt to start the stream if it is not
   * already running.
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            this.eventType = data.WeekendInfo.EventType;
            this.track = data.WeekendInfo.TrackDisplayName;
            this.config = data.WeekendInfo.TrackConfigName;
          }
        }
      );
  }
}
