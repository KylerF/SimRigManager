import { Component, Input, OnInit } from '@angular/core';

import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'models/driver';

@Component({
  selector: 'app-driver-avatar',
  templateUrl: './driver-avatar.component.html',
  styleUrls: ['./driver-avatar.component.scss']
})

/**
 * Component to display a driver's avatar
 */
export class DriverAvatarComponent implements OnInit {
  @Input() driver: Driver;
  @Input() maxWidth;

  avatarURL: string;

  constructor(
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.setAvatarURL();

    // Watch for changes to the driver's profile picture
    this.driverService.selectedDriver$.subscribe(driver => {
      this.driver = driver;
      this.setAvatarURL();
    });
  }

  setAvatarURL() {
    if (this.driver) {
      this.avatarURL = this.driverService.getAvatarURLForDriver(this.driver);
    }
  }
}
