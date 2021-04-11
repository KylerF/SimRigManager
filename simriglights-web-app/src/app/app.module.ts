import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { ControllerListComponent } from './controller-list/controller-list.component';
import { HomeComponent } from './home/home.component';
import { NewDriverComponent } from './new-driver/new-driver.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { SelectDriverComponent } from './select-driver/select-driver.component';

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
    SelectDriverComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes), 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
