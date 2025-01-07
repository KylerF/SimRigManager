import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-weekend-info-display',
  templateUrl: './weekend-info-display.component.html',
  styleUrls: ['./weekend-info-display.component.scss'],
  standalone: false,
})

/**
 * Component to display the weekend info (track, weather, etc.)
 */
export class WeekendInfoDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  eventType: string;
  track: string;
  config: string;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        this.eventType = data.WeekendInfo.EventType;
        this.track = data.WeekendInfo.TrackDisplayName;
        this.config = data.WeekendInfo.TrackConfigName;
      }
    });
  }
}
