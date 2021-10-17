import { Component, Input, OnInit } from '@angular/core';

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
  }
}
