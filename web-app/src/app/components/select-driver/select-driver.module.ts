import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDriverComponent } from './select-driver.component';
import { SharedPipesModule } from 'src/app/pipes/pipes.module';
import { SharedComponentsModule } from '../components.module';
import { SelectDriverRoutingModule } from './select-driver-routing.module';

@NgModule({
  imports: [CommonModule, SelectDriverRoutingModule, SharedPipesModule, SharedComponentsModule],
  declarations: [SelectDriverComponent],
})
export class SelectDriverModule {}
