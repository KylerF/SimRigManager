import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../services/controller.service';
import { Controller } from '../models/controller';


@Component({
  selector: 'controller-list',
  templateUrl: './controller-list.component.html',
  styleUrls: ['./controller-list.component.css']
})

/**
 * Component to list and configure WLED controllers
 */
export class ControllerListComponent implements OnInit {
  controllers: Controller[];
  loading: boolean;
  error: string;

  constructor(private controllerService: ControllerService) { }

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
}
