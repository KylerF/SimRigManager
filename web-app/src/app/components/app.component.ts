import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Driver } from 'models/driver';
import { DriverService } from 'services/driver.service';
import { APIHelper } from 'helpers/api-helper';
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
  error: string;

  params: string = "";

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
    this.params = `?${Date.now().toString()}`;
  }

  /**
   * Get the active driver
   */
  getSelectedDriver() {
    this.driverService.getSelectedDriver().subscribe(
      response => {
        // Success!
        this.activeDriver = response;
        this.activeDriver.profilePic = `${APIHelper.getBaseUrl()}${this.activeDriver.profilePic.substring(1)}`;
      },
      error => {
        // Failed. Save the response.
        this.error = error.message;
      }
    );
  }
}
