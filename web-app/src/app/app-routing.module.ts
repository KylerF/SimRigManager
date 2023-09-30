import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'selectdriver',
    loadChildren: () =>
      import('components/select-driver/select-driver.module').then((m) => m.SelectDriverModule),
  },
  {
    path: 'scoreboard',
    loadChildren: () =>
      import('components/scoreboard/scoreboard.module').then((m) => m.ScoreboardModule),
  },
  {
    path: 'controllers',
    loadChildren: () =>
      import('components/controller-list/controller-list.module').then(
        (m) => m.ControllerListModule
      ),
  },
  {
    path: 'telemetry',
    loadChildren: () =>
      import('components/telemetry-dashboard/telemetry-dashboard.module').then(
        (m) => m.TelemetryDashboardModule
      ),
  },
  {
    path: 'driverprofile',
    loadChildren: () =>
      import('components/driver-profile/driver-profile.module').then((m) => m.DriverProfileModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () =>
      import('components/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
