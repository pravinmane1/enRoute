import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'flights', pathMatch: 'full' },
  {
    path: 'flights',
    loadChildren: () =>
      import('./feature-modules/flight/flight.module').then(
        (m) => m.FlightModule
      ),
  },
  {
    path: 'hotels',
    loadChildren: () =>
      import('./feature-modules/hotels/hotels.module').then(
        (m) => m.HotelsModule
      ),
  },
  {
    path: 'cars',
    loadChildren: () =>
      import('./feature-modules/cars/cars.module').then((m) => m.CarsModule),
  },
  {
    path: 'activities',
    loadChildren: () =>
      import('./feature-modules/activities/activities.module').then(
        (m) => m.ActivitiesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
