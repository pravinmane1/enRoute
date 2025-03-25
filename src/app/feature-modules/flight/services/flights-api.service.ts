import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { FlightResponse } from '../interfaces/flight-response.interface';
import { FLIGHTS } from '../constants/flights.const';

@Injectable()
export class FlightsApiService {
  constructor() {}

  public fetchFlights(
    departureAirport: string,
    arrivalAirport: string,
  ): Observable<FlightResponse> {
    const flights = this.getFlights(departureAirport, arrivalAirport);
    return of({ flights }).pipe(delay(500));
  }

  private getFlights(departureAirport: string, arrivalAirport: string) {
    return FLIGHTS.map((flight) => {
      const airlineLogoUrls: { [s: string]: string } = {
        'Air India': 'assets/airlines/air-india.png',
        'Vistara Airways': 'assets/airlines/vistara.png',
        'Indigo Airline': 'assets/airlines/indigo.png',
      };

      flight.airlineLogo = airlineLogoUrls[flight.airlineId];

      flight.departureInMillies = flight.departureDate.getTime();
      flight.arrivalInMillies = flight.arrivalDate.getTime();

      flight.departureTimeDisplay = this.getDisplayTime(flight.departureDate);
      flight.arrivalTimeDisplay = this.getDisplayTime(flight.arrivalDate);

      flight.durationDisplay = this.getDisplayDuration(
        flight.departureDate,
        flight.arrivalDate,
      );
      flight.durationInMillies =
        flight.arrivalDate.getTime() - flight.departureDate.getTime();

      flight.departureAirportCode = departureAirport;
      flight.arrivalAirportCode = arrivalAirport;

      return { ...flight };
    });
  }

  private getDisplayTime(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();

    let amOrPm = 'am';
    if (hours > 12) {
      hours = hours - 12;
      amOrPm = 'pm';
    }
    const displayHours = hours < 10 ? `0${hours}` : `${hours}`;
    const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${displayHours}:${displayMinutes}${amOrPm}`;
  }

  private getDisplayDuration(pastDate: Date, futureDate: Date) {
    const diffMillies = futureDate.getTime() - pastDate.getTime();
    return this.msToTime(diffMillies);
  }

  private msToTime(duration: number) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    minutes = Math.round(minutes / 10) * 10;

    const newhours = hours < 10 ? '0' + hours : hours;
    const newminutes = minutes < 10 ? '0' + minutes : minutes;
    let text = '' + newhours + 'h';
    if (minutes !== 0) {
      text = text + ' ' + newminutes + 'm';
    }
    return text;
  }
}
