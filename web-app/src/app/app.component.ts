import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Driver } from './models/driver';
import { DriverService } from './services/driver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  driverChangeSubscription: Subscription;

  activeDriver: Driver;
  error: string;

  params: string = "";

  constructor(
    private driverService: DriverService
  ) { }

  /**
   * Get the active driver and subscribe to changes
   */
  ngOnInit() {
    this.getSelectedDriver();
    
    this.driverChangeSubscription = this.driverService.selectedDriver$
       .subscribe(driver => this.updateDriverDisplay(driver));
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
      },
      error => {
        // Failed. Save the response.
        this.error = error.message;
      }
    );
  }
}
