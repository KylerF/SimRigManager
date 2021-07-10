import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ControllerListComponent } from './controller-list/controller-list.component';
import { HomeComponent } from './home/home.component';
import { NewDriverComponent } from './new-driver/new-driver.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { SelectDriverComponent } from './select-driver/select-driver.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewControllerComponent } from './new-controller/new-controller.component';
import { QuoteComponent } from './quote/quote.component';
import { DataTablesModule } from "angular-datatables";
import { HoursMinutesSecondsPipe } from './pipes/hours-minutes-seconds.pipe';
import { ControllerSettingsComponent } from './controller-settings/controller-settings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newdriver', component: NewDriverComponent }, 
  { path: 'selectdriver', component: SelectDriverComponent }, 
  { path: 'scoreboard', component: ScoreboardComponent }, 
  { path: 'controllers', component: ControllerListComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
    ControllerSettingsComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes), 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    DataTablesModule, 
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
