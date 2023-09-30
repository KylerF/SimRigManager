import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelemetryDashboardComponent } from './telemetry-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TelemetryDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelemetryDashboardRoutingModule {}
