import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TelemetryDashboardRoutingModule } from './telemetry-dashboard-routing.module';
import { TelemetryDashboardComponent } from './telemetry-dashboard.component';
import { SharedTelemetryComponentsModule } from './telemetry.module';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    TelemetryDashboardRoutingModule,
    SharedTelemetryComponentsModule,
  ],
  declarations: [TelemetryDashboardComponent],
})
export class TelemetryDashboardModule {}
