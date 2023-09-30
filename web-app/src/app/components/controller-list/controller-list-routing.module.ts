import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControllerListComponent } from './controller-list.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControllerListRoutingModule {}
