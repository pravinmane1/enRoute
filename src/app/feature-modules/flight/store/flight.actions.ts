import { createAction, props } from '@ngrx/store';
import { FlightSearchModel } from './flight.state';
import { Flight } from '../interfaces/flight-response.interface';
import { Airport } from '../interfaces/airport-response.interface';

const SET_SEARCH_MODEL = '[Flight] Set search model';
const SET_FLIGHTS_LOADING = '[Flight] Set flights loading';

const FETCH_FLIGHTS = '[Flight] fetch flights';
const FLIGHTS_FETCHED = '[Flight] flight fetched';

const SORT_FLIGHTS = '[Flight] sort flights';
const FLIGHTS_SORTED = '[Flight] flights sorted';

const FILTER_FLIGHTS = '[Flight] filter flights';
const FLIGHTS_FILTERED = '[Flight] flights filtered';

const FETCH_POPULAR_AIRPORTS = '[Flight] fetch popular airports';
const FETCH_AIRPORTS_BY_TEXT = '[Flight] fetch airports by text';
const AIRPORTS_LIST_FETCHED = '[Flight] airports list fetched';

export const setSearchModel = createAction(
  SET_SEARCH_MODEL,
  props<FlightSearchModel>()
);
export const setFlightsLoading = createAction(
  SET_FLIGHTS_LOADING,
  props<{ isLoading: boolean }>()
);
export const fetchFlights = createAction(
  FETCH_FLIGHTS,
  props<{ departure: string; destination: string }>()
);
export const flightsFetched = createAction(
  FLIGHTS_FETCHED,
  props<{ flights: Flight[] }>()
);

export const sortFlights = createAction(
  SORT_FLIGHTS,
  props<{
    title: string;
    field:
      | 'airlineName'
      | 'arrivalInMillies'
      | 'departureInMillies'
      | 'durationInMillies'
      | 'price';
    sortDir: number;
  }>()
);
export const flightsSorted = createAction(
  FLIGHTS_SORTED,
  props<{ flights: Flight[] }>()
);

export const filterFlights = createAction(
  FILTER_FLIGHTS,
  props<{
    minPrice: number | null;
    maxPrice: number | null;
    classTypes: string[] | null;
  }>()
);
export const flightsFiltered = createAction(
  FLIGHTS_FILTERED,
  props<{ flights: Flight[] }>()
);

export const fetchPopularAirports = createAction(FETCH_POPULAR_AIRPORTS);

export const fetchAirportByText = createAction(
  FETCH_AIRPORTS_BY_TEXT,
  props<{ searchText:string }>()
);

export const airportsFetched = createAction(
  AIRPORTS_LIST_FETCHED,
  props<{ airports: Airport[] }>()
);
