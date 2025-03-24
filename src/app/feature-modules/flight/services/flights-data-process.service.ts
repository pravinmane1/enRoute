import { Injectable } from '@angular/core';
import { Flight } from '../interfaces/flight-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightsDataProcessService {
  sortFlights(
    sortOption: {
      title: string;
      field:
        | 'airlineName'
        | 'arrivalInMillies'
        | 'departureInMillies'
        | 'durationInMillies'
        | 'price';
      sortDir: number;
    },
    allFlights: Flight[]
  ) {
    const sortedFlights = [...allFlights].sort((flightA, flightB) => {
      switch (sortOption.field) {
        case 'price':
          if (sortOption.sortDir === 1) {
            return flightA.classTypes[0].price - flightB.classTypes[0].price;
          } else {
            return flightB.classTypes[0].price - flightA.classTypes[0].price;
          }
        case 'airlineName':
          if (sortOption.sortDir === 1) {
            return flightA[sortOption.field].localeCompare(
              flightB[sortOption.field]
            );
          } else {
            return flightB[sortOption.field].localeCompare(
              flightA[sortOption.field]
            );
          }
          break;
        default:
          if (sortOption.sortDir === 1) {
            return flightA[sortOption.field] - flightB[sortOption.field];
          } else {
            return flightB[sortOption.field] - flightA[sortOption.field];
          }
      }
    });
    return sortedFlights;
  }

  filterFlights(
    filters: {
      minPrice: number | null;
      maxPrice: number | null;
      classTypes: string[] | null;
    },
    allFlights: Flight[]
  ) {
    let filteredFlights = allFlights.map((flight) => ({
      ...flight,
      classTypes: [...flight.classTypes],
    }));

    filteredFlights = filteredFlights.filter((flight) => {
      if (filters.classTypes?.length) {
        flight.classTypes = flight.classTypes.filter((classType) => {
          return filters.classTypes?.includes(classType.code);
        });
      }

      if (filters.minPrice) {
        flight.classTypes = flight.classTypes.filter((classType) => {
          return classType.price >= (filters.minPrice as number);
        });
      }

      if (filters.maxPrice) {
        flight.classTypes = flight.classTypes.filter((classType) => {
          return classType.price <= (filters.maxPrice as number);
        });
      }

      if (!flight.classTypes.length) {
        return false;
      }
      return true;
    });

    return filteredFlights;
  }
}
