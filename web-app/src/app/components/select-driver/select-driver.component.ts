import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { NewDriverComponent } from 'components/new-driver/new-driver.component';
import { Driver, DriverState } from 'models/driver';
import { loadActiveDriver, loadAllDrivers, setActiveDriver } from 'store/actions/driver.actions';
import { selectDriverState } from 'store/reducers';
import { Observable } from 'rxjs';
import { StateContainer } from 'models/state';

@Component({
  selector: 'app-select-driver',
  templateUrl: './select-driver.component.html',
  styleUrls: ['./select-driver.component.scss'],
})

/**
 * Component to show the driver selection table
 */
export class SelectDriverComponent implements OnInit {
  drivers$: Observable<StateContainer<DriverState>>;
  drivers: Driver[] = [];
  driverChanged: boolean;

  loading: boolean = true;
  error: any;

  iracingLink: String = 'https://members-ng.iracing.com';

  constructor(
    private modalService: NgbModal, // Service to display and interface with modal dialogs
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getDrivers();
  }

  /**
   * Get all available drivers and subscribe to the active driver
   */
  getDrivers() {
    this.store.dispatch(loadAllDrivers());
    this.store.dispatch(loadActiveDriver());
    this.drivers$ = this.store.select(selectDriverState);
  }

  /**
   * Sign in with the selected driver profile
   *
   * @param driver the selected driver profile
   */
  selectDriver(driver: Driver) {
    this.store.dispatch(setActiveDriver({ driver: driver }));
    this.driverChanged = true;
  }

  /**
   * Show the modal new driver form
   */
  showAddDriverDialog() {
    const modalRef = this.modalService.open(NewDriverComponent, { centered: true });

    // Add the new driver after successful creation
    modalRef.result
      .then((newDriver) => {
        this.drivers.push(newDriver);
      })
      .catch((_) => {
        // Cancelled
        {
        }
      });
  }
}
