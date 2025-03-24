import { Airport } from '../interfaces/airport-response.interface';
import { Flight } from '../interfaces/flight-response.interface';

export const FLIGHT_STATE = 'flight';

export interface FlightState {
  searchModel: FlightSearchModel;
  searchedFlights: Flight[] | null;
  processedFlights: Flight[] | null;
  isFlightSearchInProgress: boolean;
  sortOption: {
    title: string;
    field:
      | 'airlineName'
      | 'arrivalInMillies'
      | 'departureInMillies'
      | 'durationInMillies'
      | 'price';
    sortDir: number;
  } | null;
  filters: {
    minPrice: number | null;
    maxPrice: number | null;
    classTypes: string[] | null;
  };
  airportsList: Airport[] | null;
  isAirportsListFetching: boolean;
}

export interface FlightSearchModel {
  departure: Airport | null;
  destination: Airport | null;
  departDate: Date | null;
  returnDate: Date | null;
  travellers: { adults: number; children: number } | null;
  classType: { name: string; code: string } | null;
}

export const initialState: FlightState = {
  searchModel: {
    departure: null,
    destination: null,
    departDate: null,
    returnDate: null,
    travellers: null,
    classType: null,
  },
  searchedFlights: null,
  processedFlights: null,
  isFlightSearchInProgress: false,
  sortOption: null,
  filters: {
    minPrice: null,
    maxPrice: null,
    classTypes: null,
  },
  airportsList: null,
  isAirportsListFetching: false
};
