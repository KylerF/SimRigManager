import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.css']
})
export class NewDriverComponent implements OnInit {
  newDriver: Driver;
  error: string;

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {

  }

  addDriver() {
    this.driverService.addDriver(this.newDriver);
  }
}
