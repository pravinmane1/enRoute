import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  airportsFetched,
  fetchAirportByText,
  fetchFlights,
  fetchPopularAirports,
  filterFlights,
  flightsFetched,
  flightsFiltered,
  flightsSorted,
  sortFlights,
} from './flight.actions';
import { combineLatest, map, switchMap, take } from 'rxjs';
import { FlightsApiService } from '../services/flights-api.service';
import { FlightsDataProcessService } from '../services/flights-data-process.service';
import {
  selectFilters,
  selectSearchedFlights,
  selectSortOption,
} from './flight.selectors';
import { Flight } from '../interfaces/flight-response.interface';
import { AirportsApiService } from '../services/airports-api.service';

@Injectable()
export class FlightEffect {
  constructor(
    private actions$: Actions,
    private flightsApService: FlightsApiService,
    private flightsDataProcessService: FlightsDataProcessService,
    private airportsApiService: AirportsApiService,
    private store: Store
  ) {}

  flightFetch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchFlights),
      switchMap((props) => {
        return this.flightsApService
          .fetchFlights(props.departure, props.destination)
          .pipe(
            take(1),
            map((response) => {
              return flightsFetched(response);
            })
          );
      })
    );
  });

  sortFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sortFlights),
      switchMap((props) => {
        return combineLatest({
          searchedFlights: this.store.select(selectSearchedFlights),
          filterOptions: this.store.select(selectFilters),
        }).pipe(
          take(1),
          map((data) => {
            let flights: Flight[] = [];
            if (data.filterOptions) {
              flights = this.flightsDataProcessService.filterFlights(
                data.filterOptions,
                data.searchedFlights!
              );
            }
            flights = this.flightsDataProcessService.sortFlights(
              props,
              flights!
            );

            return flightsSorted({ flights });
          })
        );
      })
    );
  });

  filterFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(filterFlights),
      switchMap((props) => {
        return combineLatest({
          searchedFlights: this.store.select(selectSearchedFlights),
          sortOptions: this.store.select(selectSortOption),
        }).pipe(
          take(1),
          map((data) => {
            let flights = this.flightsDataProcessService.filterFlights(
              props,
              data.searchedFlights!
            );

            if (data.sortOptions) {
              flights = this.flightsDataProcessService.sortFlights(
                data.sortOptions,
                flights!
              );
            }
            return flightsFiltered({ flights });
          })
        );
      })
    );
  });

  fetchPopularAirports$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchPopularAirports),
      switchMap(() => {
        return this.airportsApiService
          .fetchPopularAirports()
          .pipe(map((airportResponse) => airportsFetched(airportResponse)));
      })
    );
  });

  fetchAirportByText$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchAirportByText),
      switchMap(({ searchText }) => {
        return this.airportsApiService
          .fetchAirports(searchText)
          .pipe(map((airportResponse) => airportsFetched(airportResponse)));
      })
    );
  });
}
