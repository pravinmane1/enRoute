import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FLIGHT_STATE, FlightState } from './flight.state';

const featureSelector = createFeatureSelector<FlightState>(FLIGHT_STATE);

export const selectFlightSearchModel = createSelector(
  featureSelector,
  (state) => state.searchModel
);
export const selectProcessedFlights = createSelector(
  featureSelector,
  (state) => state.processedFlights
);
export const selectSearchedFlights = createSelector(
  featureSelector,
  (state) => state.searchedFlights
);

export const selectSortOption = createSelector(
  featureSelector,
  (state) => state.sortOption
);

export const selectFilters = createSelector(
  featureSelector,
  (state) => state.filters
);
export const selectIsFlightFetching = createSelector(
  featureSelector,
  (state) => state.isFlightSearchInProgress
);
export const selectIsAirportFetching = createSelector(
  featureSelector,
  (state) => state.isAirportsListFetching
);

export const selectAirportsList = createSelector(
  featureSelector,
  (state) => state.airportsList
);

export const selectIsAirportsListLoading = createSelector(
  featureSelector,
  (state) => state.isAirportsListFetching
);
