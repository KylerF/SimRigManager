import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { Constants } from 'helpers/constants';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-flag-display',
  templateUrl: './flag-display.component.html',
  styleUrls: ['./flag-display.component.scss'],
})

/**
 * Component to display the current flag
 */
export class FlagDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  private flagColorMap = new Map([
    [Constants.iracing.flags.noFlag, 0],
    [Constants.iracing.flags.greenFlag, 10],
    [Constants.iracing.flags.blackFlag, 20],
    [Constants.iracing.flags.cautionFlag, 30],
    [Constants.iracing.flags.redFlag, 40],
  ]);

  flag: number;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the flag.
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        this.flag = data.SessionFlags;
      }
    });
  }
}
