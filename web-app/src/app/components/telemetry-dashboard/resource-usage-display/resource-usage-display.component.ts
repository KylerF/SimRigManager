import { Component } from '@angular/core';
import * as _ from 'lodash';

import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from '../../../services/iracing-data.service';

@Component({
  selector: 'app-resource-usage-display',
  templateUrl: './resource-usage-display.component.html',
  styleUrls: ['./resource-usage-display.component.scss']
})

/**
 * Component to show a speedometer
 */
export class ResourceUsageDisplayComponent extends BaseTelemetryDisplayComponent {
  fps: number;
  cpuUsage: number;
  gpuUsage: number;

  constructor (iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the statistics.
   * The component will attempt to start the stream if it is not
   * already running.
   */
  ngOnInit(): void {
    this.iracingDataService.startStream();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            this.fps = data.FrameRate;
            this.cpuUsage = data.CpuUsageFG;
            this.gpuUsage = data.GpuUsage;
          }
        }
      );
  }
}
