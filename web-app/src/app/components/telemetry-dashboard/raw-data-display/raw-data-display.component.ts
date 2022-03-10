import { Component } from '@angular/core';

import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';
import * as _ from 'lodash';
import { APIHelper } from 'helpers/api-helper';

@Component({
  selector: 'app-raw-data-display',
  templateUrl: './raw-data-display.component.html',
  styleUrls: ['./raw-data-display.component.scss']
})

/**
 * Component to display a list of all raw iRacing data attributes and
 * selected raw data
 */
export class RawDataDisplayComponent extends BaseTelemetryDisplayComponent {
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
          if (!_.isEmpty(data)) {
            if (!this.allKeys) {
              // Get all keys from the first data frame
              this.allKeys = _.keys(data);
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
