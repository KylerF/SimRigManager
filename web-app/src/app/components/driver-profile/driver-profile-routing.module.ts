import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverProfileComponent } from './driver-profile.component';

const routes: Routes = [
  {
    path: '',
    component: DriverProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverProfileRoutingModule {}
