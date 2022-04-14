import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
export class DriverAvatarComponent implements OnInit, OnChanges {
  @Input() driver: Driver;
  @Input() maxWidth;

  avatarURL: string;

  constructor(
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.setAvatarURL();
  }

  /**
   * Update the avatar URL when the driver changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.driver.currentValue !== changes.driver.previousValue) {
      this.setAvatarURL();
    }
  }

  /**
   * Set the avatar URL using the driver service
   */
  setAvatarURL() {
    if (this.driver) {
      this.avatarURL = this.driverService.getAvatarURLForDriver(this.driver);
    }
  }
}
