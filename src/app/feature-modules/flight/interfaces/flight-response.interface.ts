import { Airport } from './airport-response.interface';

export interface FlightResponse {
  flights: Flight[];
}

export interface Flight {
  airlineName: string;
  airlineId: string;
  airlineLogo: string;
  departureDate: Date;
  departureInMillies: number;
  departureTimeDisplay: string;
  arrivalDate: Date;
  arrivalInMillies: number;
  arrivalTimeDisplay: string;
  durationDisplay: string;
  durationInMillies: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  stops: Airport[];
  classTypes: classType[];
}

interface classType {
  code: string;
  name: string;
  price: number;
  seatsLeft: number | null;
}
