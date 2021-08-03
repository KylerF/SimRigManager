import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveDriver } from './models/active-driver';
import { DriverService } from './services/driver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
   * Check for an existing signed-in user and cart items.
   * If no user is signed in, redirect to default page.
   */
  ngOnInit() {
    this.getSelectedDriver();
    
    this.driverChangeSubscription = this.driverService.selectedDriver$
       .subscribe(driver => this.activeDriver = driver);
  }

  /**
   * Get the last selected driver
   */
  getSelectedDriver() {
    this.driverService.getSelectedDriver().subscribe(
      response => {
        // Success! 
        this.activeDriver = response;
      },
      error => {
        // Failed. Save the response.
        this.error = error;
      }
    );
  }
}
