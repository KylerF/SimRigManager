import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { SharedPipesModule } from 'src/app/pipes/pipes.module';
import { SharedComponentsModule } from '../components.module';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [CommonModule, NotFoundRoutingModule, SharedPipesModule, SharedComponentsModule],
  declarations: [NotFoundComponent],
})
export class NotFoundModule {}
