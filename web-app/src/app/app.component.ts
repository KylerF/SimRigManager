import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveDriver } from './models/active-driver';
import { DriverService } from './services/driver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'simriglights-web-app';

  driverChangeSubscription: Subscription;

  activeDriver: ActiveDriver;
  error: string;

  constructor(
    private driverService: DriverService
  ) { }

  /**
   * Get the active driver and subscribe to changes
   */
  ngOnInit() {
    this.getSelectedDriver();
    
    this.driverChangeSubscription = this.driverService.selectedDriver$
       .subscribe(driver => this.activeDriver = driver);
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
