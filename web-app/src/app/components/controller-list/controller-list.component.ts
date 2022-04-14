import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from "rxjs/internal/observable/interval";
import { startWith } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { State, selectControllers } from 'store/reducers';

import { ControllerSettingsComponent } from '../controller-settings/controller-settings.component';
import { NewControllerComponent } from '../new-controller/new-controller.component';
import { ControllerService } from 'services/controller.service';
import { DriverService } from 'services/driver.service';
import { Controller } from 'models/controller';
import { Observable, Subscription } from 'rxjs';
import { LoadControllers } from 'store/actions/controller.actions';
import { StateContainer } from 'models/state';

@Component({
  selector: 'app-controller-list',
  templateUrl: './controller-list.component.html',
  styleUrls: ['./controller-list.component.scss']
})

/**
 * Component to list and configure WLED controllers
 */
export class ControllerListComponent implements OnInit, OnDestroy {
  controllers$: Observable<StateContainer<Controller[]>>;
  loading: boolean = true;
  error: string;

  wledPoller: Subscription;
  pollingInterval = 10000; // ms

  constructor(
    private controllerService: ControllerService, // Used to query WLED light controllers
    private modalService: NgbModal, // Service to display and interface with modal dialogs
    private driverService: DriverService,
    private store: Store<State>
  ) { }

  // Poll controllers to update their status
  ngOnInit(): void {
    this.controllers$ = this.store.select(selectControllers);
    this.getControllers();

    this.wledPoller = interval(this.pollingInterval)
      .pipe(
        startWith(0)
      )
      .subscribe(_ => this.pollControllerStatus());
  }

  /**
   * Retrieve configured WLED controllers, and start polling their status
   * TODO: Poll all controller states
   */
  getControllers() {
    this.store.dispatch(new LoadControllers());
  }

  /**
   * Poll all available controllers for status
   */
  pollControllerStatus() {
    //for(let controller of this.controllers) {
    //  this.getControllerState(controller);
    //}
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
        modalRef.result.then((updatedController: Controller) => {
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
      //this.controllers.push(newController);
      this.getControllerState(newController);
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
