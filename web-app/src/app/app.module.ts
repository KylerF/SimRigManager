import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from 'components/app.component';
import { NewDriverComponent } from 'components/new-driver/new-driver.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewControllerComponent } from 'components/new-controller/new-controller.component';
import { ControllerSettingsComponent } from 'components/controller-settings/controller-settings.component';
import { IpAddressValidator } from 'directives/validators/ip-address-validator.directive';
import { DeleteDriverComponent } from 'components/delete-driver/delete-driver.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from 'store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { ApiHealthcheckEffects } from 'store/effects/api-healthcheck.effects';
import { QuoteEffects } from 'store/effects/quote.effects';
import { ControllerEffects } from 'store/effects/controller.effects';
import { ApiStatusBannerComponent } from 'components/status-banner/api-status-banner/api-status-banner.component';
import { LaptimeEffects } from 'store/effects/laptime.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotificationComponent } from 'components/notification/notification.component';
import { DriverEffects } from './store/effects/driver.effects';
import { SharedComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    NewDriverComponent,
    NewControllerComponent,
    ControllerSettingsComponent,
    IpAddressValidator,
    DeleteDriverComponent,
    ApiStatusBannerComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([
      ApiHealthcheckEffects,
      QuoteEffects,
      ControllerEffects,
      LaptimeEffects,
      DriverEffects,
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    GraphQLModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SharedComponentsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
