import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedPipesModule } from 'src/app/pipes/pipes.module';
import { SharedComponentsModule } from '../components.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedPipesModule, SharedComponentsModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
