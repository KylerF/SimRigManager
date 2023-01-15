import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Driver } from 'models/driver';
import { ActiveDriverGQL } from 'services/driver.service';
import { State } from 'store/reducers';
import { UpdateApiHealthcheck } from 'store/actions/api-healthcheck.actions';
import { NotificationService } from 'services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  activeDriver$: Observable<Driver>;
  avatarURL: string;

  error: string;

  constructor(
    private store: Store<State>,
    private activeDriverService: ActiveDriverGQL,
    private notificationService: NotificationService
  ) { }

  /**
   * Get the active driver and subscribe to changes
   */
  ngOnInit() {
    this.pollAPIAvailable();

    this.activeDriver$ = this.activeDriverService.subscribe().pipe(
      map(
        result => result.data.activeDriver
      )
    );

    this.activeDriver$.subscribe(
      driver => {
        this.notificationService.show(
          `Signed in as ${driver.name}`,
          {
            autohide: true,
            headertext: 'Notification'
          }
        );
      }
    )
  }

  /**
   * Start polling the API availability status and updating the store
   */
  pollAPIAvailable() {
    this.store.dispatch(UpdateApiHealthcheck());
  }
}
