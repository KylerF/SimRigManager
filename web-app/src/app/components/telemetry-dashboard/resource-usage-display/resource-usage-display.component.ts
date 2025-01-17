import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-resource-usage-display',
  templateUrl: './resource-usage-display.component.html',
  styleUrls: ['./resource-usage-display.component.scss'],
  standalone: false,
})

/**
 * Component to show the current resource utilization (CPU, GPU) and framrate
 */
export class ResourceUsageDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  fps: number;
  cpuUsage: number;
  gpuUsage: number;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the statistics.
   * The component will attempt to start the stream if it is not
   * already running.
   */
  ngOnInit(): void {
    this.iracingDataService.startStream();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        this.fps = data.FrameRate;
        this.cpuUsage = data.CpuUsageFG;
        this.gpuUsage = data.GpuUsage;
      }
    });
  }
}
