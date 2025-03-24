import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchInputComponent } from './components/flight-search-input/flight-search-input.component';
import { FlightSearchResultComponent } from './components/flight-search-result/flight-search-result.component';

const routes: Routes = [
  { path: '', component: FlightSearchInputComponent },
  { path: 'search', component: FlightSearchResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlightRoutingModule {}
