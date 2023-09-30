import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BestLapTimeDisplayComponent } from './best-lap-time-display/best-lap-time-display.component';
import { CarDisplayComponent } from './car-display/car-display.component';
import { CurrentLapTimeDisplayComponent } from './current-lap-time-display/current-lap-time-display.component';
import { DeltaDisplayComponent } from './delta-display/delta-display.component';
import { FlagDisplayComponent } from './flag-display/flag-display.component';
import { FuelLevelDisplayComponent } from './fuel-level-display/fuel-level-display.component';
import { GearIndicatorDisplayComponent } from './gear-indicator-display/gear-indicator-display.component';
import { IncidentCountDisplayComponent } from './incident-count-display/incident-count-display.component';
import { PedalsDisplayComponent } from './inputs/pedals/pedals-display.component';
import { WheelDisplayComponent } from './inputs/wheel/wheel-display.component';
import { LapCountDisplayComponent } from './lap-count-display/lap-count-display.component';
import { PositionDisplayComponent } from './position-display/position-display.component';
import { RawDataDisplayComponent } from './raw-data-display/raw-data-display.component';
import { ResourceUsageDisplayComponent } from './resource-usage-display/resource-usage-display.component';
import { RpmDisplayComponent } from './rpm-display/rpm-display.component';
import { SpeedometerComponent } from './speedometer/speedometer.component';
import { TrackMapDisplayComponent } from './track-map-display/track-map-display.component';
import { WeekendInfoDisplayComponent } from './weekend-info-display/weekend-info-display.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    BestLapTimeDisplayComponent,
    CarDisplayComponent,
    CurrentLapTimeDisplayComponent,
    DeltaDisplayComponent,
    FlagDisplayComponent,
    FuelLevelDisplayComponent,
    GearIndicatorDisplayComponent,
    IncidentCountDisplayComponent,
    PedalsDisplayComponent,
    WheelDisplayComponent,
    LapCountDisplayComponent,
    PositionDisplayComponent,
    RawDataDisplayComponent,
    ResourceUsageDisplayComponent,
    RpmDisplayComponent,
    SpeedometerComponent,
    TrackMapDisplayComponent,
    WeekendInfoDisplayComponent,
  ],
  exports: [
    BestLapTimeDisplayComponent,
    CarDisplayComponent,
    CurrentLapTimeDisplayComponent,
    DeltaDisplayComponent,
    FlagDisplayComponent,
    FuelLevelDisplayComponent,
    GearIndicatorDisplayComponent,
    IncidentCountDisplayComponent,
    PedalsDisplayComponent,
    WheelDisplayComponent,
    LapCountDisplayComponent,
    PositionDisplayComponent,
    RawDataDisplayComponent,
    ResourceUsageDisplayComponent,
    RpmDisplayComponent,
    SpeedometerComponent,
    TrackMapDisplayComponent,
    WeekendInfoDisplayComponent,
  ],
})
export class SharedTelemetryComponentsModule {}
