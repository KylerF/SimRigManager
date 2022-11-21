import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Driver } from 'models/driver';
import { DriverService, ActiveDriverGQL } from 'services/driver.service';
import * as fromRoot from 'store/reducers';
import { UpdateApiHealthcheck } from 'store/actions/api-healthcheck.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  driverChangeSubscription: Observable<Driver>;

  activeDriver$: Observable<Driver>;
  avatarURL: string;

  error: string;

  constructor(
    private store: Store<fromRoot.State>,
    private driverService: DriverService,
    private activeDriverService: ActiveDriverGQL
  ) { }

  /**
   * Get the active driver and subscribe to changes
   */
  ngOnInit() {
    this.pollAPIAvailable();
    this.driverService.streamSelectedDriver();

    this.activeDriver$ = this.activeDriverService.subscribe().pipe(
      map(result => result.data.activeDriver)
    )
  }

  /**
   * Start polling the API availability status and updating the store
   */
  pollAPIAvailable() {
    this.store.dispatch(UpdateApiHealthcheck());
  }
}
