import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { UpdateApiHealthcheck } from 'store/actions/api-healthcheck.actions';
import { NotificationService } from 'services/notification.service';
import { loadActiveDriver } from 'store/actions/driver.actions';
import { selectActiveDriver, State } from 'store/reducers';
import { Driver } from 'models/driver';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  activeDriver$: Observable<Driver>;

  error: string;

  constructor(private store: Store<State>, private notificationService: NotificationService) {}

  /**
   * Get the active driver and subscribe to changes
   */
  ngOnInit() {
    this.pollAPIAvailable();
    this.subscribeToActiveDriver();

    this.activeDriver$ = this.store.select(selectActiveDriver);
  }

  /*
   * Subscribe to the active driver
   */
  subscribeToActiveDriver() {
    this.store.dispatch(loadActiveDriver());
  }

  /**
   * Start polling the API availability status and updating the store
   */
  pollAPIAvailable() {
    this.store.dispatch(UpdateApiHealthcheck());
  }
}
