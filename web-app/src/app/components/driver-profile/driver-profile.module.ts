import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverProfileComponent } from './driver-profile.component';
import { SharedPipesModule } from 'pipes/pipes.module';
import { SharedComponentsModule } from '../components.module';
import { FormsModule } from '@angular/forms';
import { DriverProfileRoutingModule } from './driver-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DriverProfileRoutingModule,
    SharedPipesModule,
    SharedComponentsModule,
    FormsModule,
  ],
  declarations: [DriverProfileComponent],
})
export class DriverProfileModule {}
