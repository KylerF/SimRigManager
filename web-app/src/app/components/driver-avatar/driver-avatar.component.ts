import { Component, Input, OnInit } from '@angular/core';
import { APIHelper } from 'src/app/_helpers/api-helper';

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
  @Input() params: string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.driver?.profilePic) {
      this.driver.profilePic = `${APIHelper.getBaseUrl()}${this.driver.profilePic.substring(1)}`;
    }
  }
}
