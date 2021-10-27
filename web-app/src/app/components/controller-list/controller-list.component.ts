import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from "rxjs/internal/observable/interval";
import { startWith } from "rxjs/operators";

import { NewControllerComponent } from '../new-controller/new-controller.component';
import { ControllerService } from '../../services/controller.service';
import { Controller } from '../../models/controller';
import { ControllerSettingsComponent } from '../controller-settings/controller-settings.component';
import { DriverService } from '../../services/driver.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'controller-list',
  templateUrl: './controller-list.component.html',
  styleUrls: ['./controller-list.component.scss']
})

/**
 * Component to list and configure WLED controllers
 */
export class ControllerListComponent implements OnInit {
  controllers: Controller[] = [];
  loading: boolean = true;
  error: string;

  wledPoller: Subscription;
  pollingInterval = 10000; // ms

  constructor(
    private controllerService: ControllerService, // Used to query WLED light controllers
    private modalService: NgbModal, // Service to display and interface with modal dialogs
    private driverService: DriverService
  ) { }

  // Poll controllers to update their status
  ngOnInit(): void {
    this.getControllers()

    this.wledPoller = interval(this.pollingInterval)
      .pipe(
        startWith(0)
      )
      .subscribe(_ => this.pollControllerStatus())
  }

  /**
   * Retrieve configured WLED controllers, along with the connection 
   * status of each
   */
  getControllers() {
    this.controllerService.getControllers().subscribe(
      controllers => {
        // Success! 
        this.controllers = controllers;
        this.loading = false;

        // Try to connect to each controller and get the state
        controllers.forEach(controller => {
          this.getControllerState(controller);
        });
      }, 
      error => {
        // Failed. Save the response.
        this.error = error;
        this.loading = false;
      }
    );
  }

  /**
   * Poll all available controllers for status
   */
  pollControllerStatus() {
    for(let controller of this.controllers) {
      this.getControllerState(controller);
    }
  }

  /**
   * Get the state of a controller
   * 
   * @param controller controller from which to retrieve data
   */
  getControllerState(controller: Controller) {
    this.controllerService.getControllerState(controller).subscribe(
      response => {
        // Save the state
        controller.state = response;
        controller.isAvailable = true;
      }, 
      error => {
        // Connection failed
        controller.state = null;
        controller.isAvailable = false;
      }
    )
  }

  /**
   * Toggle the power of a controller
   * 
   * @param controller controller to toggle
   */
  togglePowerController(controller: Controller) {
    this.controllerService.togglePowerController(controller).subscribe(
      response => {
        // Success! Update the state.
        this.getControllerState(controller);
      }, 
      error => {
        this.error = error.message;
      }
    );
  }

  /**
   * Delete a controller
   */
  deleteController(controller: Controller) {
    this.controllerService.deleteController(controller).subscribe(
      response => {
        // Success! Update the controller list.
        this.getControllers();
      },
      error => {
        // Failed. Save the response.
        this.error = error;
      }
    );
  }

  /**
   * Show the modal controller settings dialog
   */
  editController(controller: Controller) {
    this.driverService.getSelectedDriver().subscribe(
      response => {
        const modalRef = this.modalService.open(ControllerSettingsComponent, { centered: true });
        modalRef.componentInstance.controller = controller;
        modalRef.componentInstance.activeDriver = response;

        // Update controller in table after changes are made
        modalRef.result.then((updatedController) => {
          this.getControllers();
        })
        .catch(_ => {
          // Cancelled
          {}
        });
      },
      error => {
        this.error = error.message;
      }
    )
  }

  /**
   * Show the modal add controller dialog
   */
  showAddControllerDialog() {
    const modalRef = this.modalService.open(NewControllerComponent, { centered: true });

    // Add the new controller after successful creation
    modalRef.result.then((newController) => {
      this.controllers.push(newController);
      this.getControllerState(newController)
    })
    .catch(_ => {
      // Cancelled
      {}
    });
  }

  ngOnDestroy() {
    this.wledPoller.unsubscribe();
  }
}
