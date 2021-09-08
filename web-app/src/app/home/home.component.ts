import { Component, OnInit } from '@angular/core';

import { ActiveDriver } from '../models/active-driver';
import { AvailabilityService } from '../services/availability.service';
import { ControllerStatus } from '../models/controller-status';
import { ControllerService } from '../services/controller.service';
import { DriverService } from '../services/driver.service';
import { IracingDataService } from '../services/iracing-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Component to show the home page with service availability status
 */
export class HomeComponent implements OnInit {
  apiActive: boolean;
  iracingDataAvailable: boolean;
  selectedDriver: ActiveDriver;
  controllerStatus: ControllerStatus[] = [];

  errors: string[] = [];

  constructor(
    private availabilityService: AvailabilityService, // used to check whether the backend API is running
    private iracingDataService: IracingDataService,
    private controllerService: ControllerService, // used to check connection to WLED controllers
    private driverService: DriverService // used to check whether a driver has been selected
  ) 
  { }

  ngOnInit(): void {
    this.getAPIAvailable();
    this.getIracingStatus();
    this.getSelectedDriver();
    this.getControllerStatus();
  }

  /**
   * Check the backend API status
   */
  getAPIAvailable() {
    this.availabilityService.getAPIAvailability().subscribe(
      response => {
        // Success! 
        this.apiActive = response.active;
      },
      error => {
        // Failed. Save the response.
        this.errors.push(error.message);
      }
    );
  }

  /**
   * Check whether data is being streamed from iRacing
   */
  getIracingStatus() {
    this.iracingDataService.getLatest().subscribe(
      response => {
        if (JSON.stringify(response) == '{}') {
          this.iracingDataAvailable = false;
        } else {
          this.iracingDataAvailable = true;
        }
      }, 
      error => {
        this.errors.push(error.message);
        this.iracingDataAvailable = false;
      }
    )
  }

  /**
   * Get the last selected driver
   */
  getSelectedDriver() {
    this.driverService.getSelectedDriver().subscribe(
      response => {
        // Success! 
        this.selectedDriver = response;
      },
      error => {
        // Failed. Save the response.
        this.errors.push(error.message);
      }
    );
  }

  /**
   * Query the status of all WLED controllers
   */
  getControllerStatus() {
    this.controllerService.getControllers().subscribe(
      controllers => {
        // Try to connect to each controller
        controllers.forEach(controller => {
          this.controllerService.getControllerState(controller).subscribe(
            response => {
              // Connection succeeded
              this.controllerStatus.push({ 'name': controller.name, 'online': true});
            }, 
            error => {
              // Connection failed
              this.controllerStatus.push({ 'name': controller.name, 'online': false});
            }
          )
        });
      }, 
      error => {
        // Failed. Save the response.
        this.errors.push(error.message);
      }
    )
  }
}
