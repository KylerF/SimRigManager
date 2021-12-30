import { Component, Input, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';
@Component({
  selector: 'app-driver-avatar',
  templateUrl: './driver-avatar.component.html',
  styleUrls: ['./driver-avatar.component.scss']
})

/**
 * Component to display a driver's avatar
 */
export class DriverAvatarComponent implements OnInit {
  @Input() driver;
  @Input() maxWidth;

  avatarURL: string;

  constructor(
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.avatarURL = this.driverService.getAvatarURLForDriver(this.driver);
  }
}
