import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from 'components/app.component';
import { ControllerListComponent } from 'components/controller-list/controller-list.component';
import { HomeComponent } from 'components/home/home.component';
import { NewDriverComponent } from 'components/new-driver/new-driver.component';
import { ScoreboardComponent } from 'components/scoreboard/scoreboard.component';
import { SelectDriverComponent } from 'components/select-driver/select-driver.component';
import { DateAgoPipe } from 'pipes/date-ago.pipe';
import { LoadingSpinnerComponent } from 'components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from 'components/error-message/error-message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewControllerComponent } from 'components/new-controller/new-controller.component';
import { QuoteComponent } from 'components/quote/quote.component';
import { HoursMinutesSecondsPipe } from 'pipes/hours-minutes-seconds.pipe';
import { ControllerSettingsComponent } from 'components/controller-settings/controller-settings.component';
import { IpAddressValidator } from 'directives/validators/ip-address-validator.directive';
import { NotFoundComponent } from 'components/not-found/not-found.component';
import { DriverProfileComponent } from 'components/driver-profile/driver-profile.component';
import { HourglassIconComponent } from 'components/hourglass-icon/hourglass-icon.component';
import { DriverAvatarComponent } from 'components/driver-avatar/driver-avatar.component';
import { DeleteDriverComponent } from 'components/delete-driver/delete-driver.component';
import { TelemetryDashboardComponent } from 'components/telemetry-dashboard/telemetry-dashboard.component';
import { WheelDisplayComponent } from 'components/telemetry-dashboard/inputs/wheel/wheel-display.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from 'store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { IracingEffects } from 'store/effects/iracing.effects';
import { ApiHealthcheckEffects } from 'store/effects/api-healthcheck.effects';
import { QuoteEffects } from 'store/effects/quote.effects';
import { ControllerEffects } from 'store/effects/controller.effects';
import { PedalsDisplayComponent } from 'components/telemetry-dashboard/inputs/pedals/pedals-display.component';
import { SpeedometerComponent } from 'components/telemetry-dashboard/speedometer/speedometer.component';
import { WeekendInfoDisplayComponent } from 'components/telemetry-dashboard/weekend-info-display/weekend-info-display.component';
import { IncidentCountDisplayComponent } from 'components/telemetry-dashboard/incident-count-display/incident-count-display.component';
import { FlagDisplayComponent } from 'components/telemetry-dashboard/flag-display/flag-display.component';
import { ResourceUsageDisplayComponent } from 'components/telemetry-dashboard/resource-usage-display/resource-usage-display.component';
import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { BestLapTimeDisplayComponent } from 'components/telemetry-dashboard/best-lap-time-display/best-lap-time-display.component';
import { CurrentLapTimeDisplayComponent } from 'components/telemetry-dashboard/current-lap-time-display/current-lap-time-display.component';
import { GearIndicatorDisplayComponent } from 'components/telemetry-dashboard/gear-indicator-display/gear-indicator-display.component';
import { RpmDisplayComponent } from 'components/telemetry-dashboard/rpm-display/rpm-display.component';
import { DeltaDisplayComponent } from 'components/telemetry-dashboard/delta-display/delta-display.component';
import { LapCountDisplayComponent } from 'components/telemetry-dashboard/lap-count-display/lap-count-display.component';
import { CarDisplayComponent } from 'components/telemetry-dashboard/car-display/car-display.component';
import { RawDataDisplayComponent } from 'components/telemetry-dashboard/raw-data-display/raw-data-display.component';
import { TrackMapDisplayComponent } from 'components/telemetry-dashboard/track-map-display/track-map-display.component';
import { ApiStatusBannerComponent } from 'components/status-banner/api-status-banner/api-status-banner.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'selectdriver', component: SelectDriverComponent },
  { path: 'driverprofile', component: DriverProfileComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'controllers', component: ControllerListComponent },
  { path: 'telemetry', component: TelemetryDashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ControllerListComponent,
    HomeComponent,
    NewDriverComponent,
    ScoreboardComponent,
    SelectDriverComponent,
    DateAgoPipe,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    NewControllerComponent,
    QuoteComponent,
    HoursMinutesSecondsPipe,
    ControllerSettingsComponent,
    IpAddressValidator,
    NotFoundComponent,
    TelemetryDashboardComponent,
    WheelDisplayComponent,
    PedalsDisplayComponent,
    DriverProfileComponent,
    HourglassIconComponent,
    DriverAvatarComponent,
    DeleteDriverComponent,
    SpeedometerComponent,
    WeekendInfoDisplayComponent,
    IncidentCountDisplayComponent,
    FlagDisplayComponent,
    ResourceUsageDisplayComponent,
    BaseTelemetryDisplayComponent,
    BestLapTimeDisplayComponent,
    CurrentLapTimeDisplayComponent,
    GearIndicatorDisplayComponent,
    RpmDisplayComponent,
    DeltaDisplayComponent,
    LapCountDisplayComponent,
    CarDisplayComponent,
    RawDataDisplayComponent,
    TrackMapDisplayComponent,
    ApiStatusBannerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    DragDropModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([
      IracingEffects,
      ApiHealthcheckEffects,
      QuoteEffects,
      ControllerEffects
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
