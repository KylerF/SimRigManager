import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoreboardComponent } from './scoreboard.component';

const routes: Routes = [
  {
    path: '',
    component: ScoreboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreboardRoutingModule {}
