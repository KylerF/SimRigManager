import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app.component';
import { ControllerListComponent } from './components/controller-list/controller-list.component';
import { HomeComponent } from './components/home/home.component';
import { NewDriverComponent } from './components/new-driver/new-driver.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { SelectDriverComponent } from './components/select-driver/select-driver.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewControllerComponent } from './components/new-controller/new-controller.component';
import { QuoteComponent } from './components/quote/quote.component';
import { HoursMinutesSecondsPipe } from './pipes/hours-minutes-seconds.pipe';
import { ControllerSettingsComponent } from './components/controller-settings/controller-settings.component';
import { IpAddressValidator } from './directives/validators/ip-address-validator.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RealTimeInputDisplayComponent } from './components/real-time-input-display/real-time-input-display.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { DriverStatsComponent } from './components/driver-stats/driver-stats.component';
import { HourglassIconComponent } from './components/hourglass-icon/hourglass-icon.component';
import { DriverAvatarComponent } from './components/driver-avatar/driver-avatar.component';
import { DeleteDriverComponent } from './components/delete-driver/delete-driver.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newdriver', component: NewDriverComponent }, 
  { path: 'selectdriver', component: SelectDriverComponent }, 
  { path: 'driverprofile', component: DriverProfileComponent }, 
  { path: 'driverstats', component: DriverStatsComponent }, 
  { path: 'scoreboard', component: ScoreboardComponent }, 
  { path: 'controllers', component: ControllerListComponent }, 
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
    RealTimeInputDisplayComponent, 
    DriverProfileComponent, 
    DriverStatsComponent, 
    HourglassIconComponent, 
    DriverAvatarComponent, 
    DeleteDriverComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    RouterModule.forRoot(routes), 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
