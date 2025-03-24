import { createReducer, on } from '@ngrx/store';
import { FlightSearchModel, initialState } from './flight.state';
import {
  airportsFetched,
  fetchAirportByText,
  fetchFlights,
  fetchPopularAirports,
  filterFlights,
  flightsFetched,
  flightsFiltered,
  flightsSorted,
  setSearchModel,
  sortFlights,
} from './flight.actions';

export const flightReducer = createReducer(
  initialState,
  on(setSearchModel, (state, props: FlightSearchModel) => {
    return {
      ...state,
      searchModel: props,
    };
  }),
  on(fetchFlights, (state) => {
    return {
      ...state,
      isFlightSearchInProgress: true,
      sortOption: null,
      filters: {
        minPrice: null,
        maxPrice: null,
        classTypes: null,
      },
    };
  }),
  on(flightsFetched, (state, props) => {
    return {
      ...state,
      isFlightSearchInProgress: false,
      searchedFlights: props.flights,
      processedFlights: props.flights,
    };
  }),
  on(sortFlights, (state, props) => {
    return {
      ...state,
      sortOption: { ...props },
    };
  }),
  on(flightsSorted, (state, props) => {
    return {
      ...state,
      processedFlights: props.flights,
    };
  }),
  on(filterFlights, (state, props) => {
    return {
      ...state,
      filters: { ...props },
    };
  }),
  on(flightsFiltered, (state, props) => {
    return {
      ...state,
      processedFlights: props.flights,
    };
  }),
  on(fetchPopularAirports, (state) => {
    return {
      ...state,
      isAirportsListFetching: true,
    };
  }),
  on(fetchAirportByText, (state) => {
    return {
      ...state,
      isAirportsListFetching: true,
    };
  }),
  on(airportsFetched, (state, props) => {
    return {
      ...state,
      isAirportsListFetching: false,
      airportsList: props.airports,
    };
  })
);
