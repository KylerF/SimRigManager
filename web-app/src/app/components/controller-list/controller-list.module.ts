import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControllerListComponent } from './controller-list.component';
import { ControllerListRoutingModule } from './controller-list-routing.module';
import { SharedComponentsModule } from '../components.module';

@NgModule({
  imports: [CommonModule, ControllerListRoutingModule, SharedComponentsModule],
  declarations: [ControllerListComponent],
})
export class ControllerListModule {}
