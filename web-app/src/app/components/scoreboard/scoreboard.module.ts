import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreboardComponent } from './scoreboard.component';
import { SharedPipesModule } from 'src/app/pipes/pipes.module';
import { SharedComponentsModule } from '../components.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ScoreboardRoutingModule,
    SharedPipesModule,
    SharedComponentsModule,
    ScrollingModule,
    FormsModule,
  ],
  declarations: [ScoreboardComponent],
})
export class ScoreboardModule {}
