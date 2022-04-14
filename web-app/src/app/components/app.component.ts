import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Driver } from 'models/driver';
import { DriverService } from 'services/driver.service';
import * as fromRoot from 'store/reducers';
import * as apiHealthcheckActions from 'store/actions/api-healthcheck.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  driverChangeSubscription: Subscription;

  activeDriver: Driver;
  avatarURL: string;

  error: string;

  constructor(
    private store: Store<fromRoot.State>,
    private driverService: DriverService
  ) { }

  /**
   * Get the active driver and subscribe to changes
   */
  ngOnInit() {
    this.pollAPIAvailable();
    this.getSelectedDriver();

    this.driverChangeSubscription = this.driverService.selectedDriver$
       .subscribe(driver => this.updateDriverDisplay(driver));
  }

  /**
   * Start polling the API availability status and updating the store
   */
  pollAPIAvailable() {
    this.store.dispatch(new apiHealthcheckActions.UpdateApiHealthcheck());
  }

  /**
   * Update the active driver display in the toolbar when it is changed
   */
  updateDriverDisplay(driver) {
    this.activeDriver = driver;
    this.avatarURL = this.driverService.getAvatarURLForDriver(this.activeDriver);
  }

  /**
   * Get the active driver
   */
  getSelectedDriver() {
    this.driverService.getSelectedDriver().subscribe(
      response => {
        // Success!
        this.activeDriver = response;
      },
      error => {
        // Failed. Save the response.
        this.error = error.message;
      }
    );
  }
}
