import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../services/controller.service';
import { Controller } from '../models/controller';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewControllerComponent } from '../new-controller/new-controller.component';


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
  loading: boolean;
  error: string;

  constructor(
    private controllerService: ControllerService, // Used to query WLED light controllers
    private modalService: NgbModal // Service to display and interface with modal dialogs
  ) 
  { }

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
   * Retrieve configured WLED controllers
   */
  getControllers() {
    this.loading = true;

    this.controllerService.getControllers().subscribe(
      response => {
        // Success! 
        this.controllers = response;
        this.loading = false;
      },
      error => {
        // Failed. Save the response.
        this.error = error;
        this.loading = false;
      }
    );
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

  updateControllers() {
    for(let controller of this.controllers) {
      controller.isBeingEdited = false;
    }
  }

  /**
   * Show the modal cart dialog
   */
   showAddControllerDialog() {
    const modalRef = this.modalService.open(NewControllerComponent, { centered: true });

    // Add the new driver after successful creation
    modalRef.result.then((newController) => {
      this.controllers.push(newController);
    }); 
  }
}
