import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../services/controller.service';
import { Controller } from '../models/controller';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewControllerComponent } from '../new-controller/new-controller.component';
import { WledState } from '../models/wled/wled-state';

@Component({
  selector: 'controller-list',
  templateUrl: './controller-list.component.html',
  styleUrls: ['./controller-list.component.css']
})

/**
 * Component to list and configure WLED controllers
 */
export class ControllerListComponent implements OnInit {
  controllers: Controller[] = [];
  controllerStatus: Map<string, boolean> = new Map();
  controllerState: Map<string, WledState> = new Map();
  loading: boolean = true;
  error: string;

  constructor(
    private controllerService: ControllerService, // Used to query WLED light controllers
    private modalService: NgbModal // Service to display and interface with modal dialogs
  ) 
  {}

  ngOnInit(): void {
    this.getControllers();
  }

  /**
   * Update config and stop editing
   */
  finishEdit() {
    this.updateControllers();
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
          this.getControllerStatus(controller);
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
   * Check whether a controller is online
   * 
   * @param controller controller to check
   */
  getControllerStatus(controller: Controller) {
    this.controllerService.getControllerStatus(controller).subscribe(
      response => {
        // Connection succeeded
        this.controllerStatus.set(controller.name, true);
      }, 
      error => {
        // Connection failed
        this.controllerStatus.set(controller.name, false);
      }
    );
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
        this.controllerState.set(controller.name, response);
      }, 
      error => {
        // Connection failed
        this.controllerState.set(controller.name, null);
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
        // Success? Update the button color.

      }, 
      error => {

      }
    )
  }

  /**
   * Switch a controller to edit mode
   */
  editController(controller: Controller) {
    var controllerToEdit = this.controllers.filter(function (thisController) {
      return thisController.id === controller.id;
    });

    controllerToEdit[0].isBeingEdited = true;
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

  updateControllers() {
    for(let controller of this.controllers) {
      controller.isBeingEdited = false;
    }
  }

  /**
   * Show the modal add controller dialog
   */
  showAddControllerDialog() {
    const modalRef = this.modalService.open(NewControllerComponent, { centered: true });

    // Add the new driver after successful creation
    modalRef.result.then((newController) => {
      this.controllers.push(newController);
    }); 
  }
}
