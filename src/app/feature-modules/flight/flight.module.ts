import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FlightRoutingModule } from './flight-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TravellersSelectorComponent } from './components/travellers-selector/travellers-selector.component';
import { StoreModule } from '@ngrx/store';
import { FLIGHT_STATE } from './store/flight.state';
import { flightReducer } from './store/flight.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FlightEffect } from './store/flight.effects';
import { FlightsApiService } from './services/flights-api.service';
import { AirportsApiService } from './services/airports-api.service';
import { SharedModule } from '../../shared/shared.module';
import { FilterFlightsComponent } from './components/filter-flights/filter-flights.component';
import { FlightSearchInputComponent } from './components/flight-search-input/flight-search-input.component';
import { FlightSearchResultComponent } from './components/flight-search-result/flight-search-result.component';
import { SortFlightsComponent } from './components/sort-flights/sort-flights.component';

@NgModule({
  declarations: [
    FlightSearchInputComponent,
    FlightSearchResultComponent,
    TravellersSelectorComponent,
    SortFlightsComponent,
    FilterFlightsComponent,
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgOptimizedImage,
    StoreModule.forFeature(FLIGHT_STATE, flightReducer),
    EffectsModule.forFeature([FlightEffect]),
  ],
  providers: [FlightsApiService, AirportsApiService],
})
export class FlightModule {}
