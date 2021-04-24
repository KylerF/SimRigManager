import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DriverService } from '../services/driver.service';
import { NewDriver } from '../models/new-driver';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.css']
})

export class NewDriverComponent implements OnInit {
  newDriver: NewDriver = { 'name': '', 'nickname': '', 'profilePic': '' };
  error: string;

  constructor(
    private driverService: DriverService, // Used to add a new driver
    private activeModal: NgbActiveModal // Used to reference the modal in which this component is displayed
  ) 
  { }

  ngOnInit(): void {

  }

  addDriver() {
    this.driverService.addDriver(this.newDriver).subscribe(
      response => {
        this.activeModal.close();
      }, 
      error => {
        this.error = error;
      }
    )
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
