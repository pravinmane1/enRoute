import { Injectable } from '@angular/core';
import {
  Airport,
  AirportResponse,
} from '../interfaces/airport-response.interface';
import { Observable, delay, of } from 'rxjs';
import { AIRPORTS } from '../constants/airports.const';

@Injectable()
export class AirportsApiService {
  constructor() {}

  public fetchAirports(text: string): Observable<AirportResponse> {
    const matchByNames: Airport[] = AIRPORTS.filter(
      (airport) =>
        airport.city?.toLowerCase()?.includes(text.toLowerCase()) ||
        airport.name?.toLowerCase().includes(text.toLowerCase()) ||
        airport.code?.toLowerCase().includes(text.toLowerCase()) ||
        airport.country?.toLowerCase().includes(text.toLowerCase())
    );
    return of({ airports: this.updateDisplayValue(matchByNames) }).pipe(
      delay(100)
    );
  }

  public fetchPopularAirports(): Observable<AirportResponse> {
    const matchByNames: Airport[] = AIRPORTS.filter(
      (airport) =>
        airport.city?.toLowerCase()?.includes('pune') ||
        airport.city?.toLowerCase()?.includes('delhi') ||
        airport.city?.toLowerCase()?.includes('mumbai') ||
        airport.city?.toLowerCase()?.includes('hydrabad') ||
        airport.city?.toLowerCase()?.includes('banglore') ||
        airport.city?.toLowerCase()?.includes('kolkata')
    );
    return of({ airports: this.updateDisplayValue(matchByNames) }).pipe(
      delay(300)
    );
  }

  private updateDisplayValue(airports: Airport[]): Airport[] {
    return airports.map((airport) => ({
      ...airport,
      displayName: `(${airport.code}) ${airport.name}, ${airport.city}, ${airport.country}`,
    }));
  }
}
