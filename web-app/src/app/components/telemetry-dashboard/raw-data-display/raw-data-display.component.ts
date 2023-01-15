import { Component, OnInit } from '@angular/core';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';
import { APIHelper } from 'helpers/api-helper';
import { isEmpty, keys } from 'lodash-es';

@Component({
  selector: 'app-raw-data-display',
  templateUrl: './raw-data-display.component.html',
  styleUrls: ['./raw-data-display.component.scss']
})

/**
 * Component to display a list of all raw iRacing data attributes and
 * selected raw data
 */
export class RawDataDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  allKeys: string[];
  selectedKey: string;
  rawValue: string;

  // Link to the selected key's documentation
  docsURL: string = APIHelper.getSdkDocLink();

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the selected raw data
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!isEmpty(data)) {
            if (!this.allKeys) {
              // Get all keys from the first data frame
              this.allKeys = keys(data).sort();
            }

            // Update the selected key
            this.rawValue = JSON.stringify(
              data[this.selectedKey]
            );

            // Update the docs URL
            this.docsURL = APIHelper.getSdkDocLink(this.selectedKey);
          }
        }
      );
  }
}
