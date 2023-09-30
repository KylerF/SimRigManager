import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDriverComponent } from './select-driver.component';

const routes: Routes = [
  {
    path: '',
    component: SelectDriverComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDriverRoutingModule {}
