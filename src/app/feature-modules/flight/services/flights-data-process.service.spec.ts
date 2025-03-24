import { TestBed } from '@angular/core/testing';
import { FlightsDataProcessService } from './flights-data-process.service';
import { Flight } from '../interfaces/flight-response.interface';

type fieldType =
  | 'airlineName'
  | 'arrivalInMillies'
  | 'departureInMillies'
  | 'durationInMillies'
  | 'price';
describe('FlightsDataProcessService', () => {
  let service: FlightsDataProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsDataProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sortFlights', () => {
    let flights: Flight[];

    beforeEach(() => {
      flights = [
        {
          airlineName: 'Vistara',
          arrivalInMillies: 2000,
          departureInMillies: 1000,
          durationInMillies: 1000,
          classTypes: [{ code: 'EC', price: 200 }],
        },
        {
          airlineName: 'Air India',
          arrivalInMillies: 3000,
          departureInMillies: 1500,
          durationInMillies: 1500,
          classTypes: [{ code: 'EC', price: 300 }],
        },
      ] as Flight[];
    });

    it('should sort flights by price in ascending order', () => {
      const sortOption = {
        title: 'Price',
        field: 'price' as fieldType,
        sortDir: 1,
      };
      const sortedFlights = service.sortFlights(sortOption, flights);

      expect(sortedFlights[0].classTypes[0].price).toBe(200);
      expect(sortedFlights[1].classTypes[0].price).toBe(300);
    });

    it('should sort flights by price in descending order', () => {
      const sortOption = {
        title: 'Price',
        field: 'price' as fieldType,
        sortDir: -1,
      };
      const sortedFlights = service.sortFlights(sortOption, flights);

      expect(sortedFlights[0].classTypes[0].price).toBe(300);
      expect(sortedFlights[1].classTypes[0].price).toBe(200);
    });

    it('should sort flights by airlineName in ascending order', () => {
      const sortOption = {
        title: 'Vistara',
        field: 'airlineName' as fieldType,
        sortDir: 1,
      };
      const sortedFlights = service.sortFlights(sortOption, flights);

      expect(sortedFlights[0].airlineName).toBe('Air India');
      expect(sortedFlights[1].airlineName).toBe('Vistara');
    });

    it('should sort flights by airlineName in descending order', () => {
      const sortOption = {
        title: 'Vistara',
        field: 'airlineName' as fieldType,
        sortDir: -1,
      };
      const sortedFlights = service.sortFlights(sortOption, flights);

      expect(sortedFlights[0].airlineName).toBe('Vistara');
      expect(sortedFlights[1].airlineName).toBe('Air India');
    });

    it('should sort flights by duration in ascending order', () => {
      const sortOption = {
        title: 'Duration',
        field: 'durationInMillies' as fieldType,
        sortDir: 1,
      };
      const sortedFlights = service.sortFlights(sortOption, flights);

      expect(sortedFlights[0].durationInMillies).toBe(1000);
      expect(sortedFlights[1].durationInMillies).toBe(1500);
    });
  });

  describe('filterFlights', () => {
    let flights: Flight[];

    beforeEach(() => {
      flights = [
        {
          airlineName: 'Vistara',
          arrivalInMillies: 2000,
          departureInMillies: 1000,
          durationInMillies: 1000,
          classTypes: [
            { code: 'EC', price: 200 },
            { code: 'business', price: 400 },
          ],
        },
        {
          airlineName: 'Air India',
          arrivalInMillies: 3000,
          departureInMillies: 1500,
          durationInMillies: 1500,
          classTypes: [
            { code: 'EC', price: 300 },
            { code: 'business', price: 500 },
          ],
        },
      ] as Flight[];
    });

    it('should filter flights by minimum price', () => {
      const filters = { minPrice: 250, maxPrice: null, classTypes: null };
      const filteredFlights = service.filterFlights(filters, flights);

      expect(filteredFlights.length).toBe(2);
      expect(filteredFlights[0].classTypes.length).toBe(1);
      expect(filteredFlights[0].classTypes[0].price).toBe(400);
      expect(filteredFlights[1].classTypes.length).toBe(2);
      expect(filteredFlights[1].classTypes[0].price).toBe(300);
      expect(filteredFlights[1].classTypes[1].price).toBe(500);
    });

    it('should filter flights by maximum price', () => {
      const filters = { minPrice: null, maxPrice: 300, classTypes: null };
      const filteredFlights = service.filterFlights(filters, flights);

      expect(filteredFlights.length).toBe(2);
      expect(filteredFlights[0].classTypes.length).toBe(1);
      expect(filteredFlights[0].classTypes[0].price).toBe(200);
      expect(filteredFlights[1].classTypes.length).toBe(1);
      expect(filteredFlights[1].classTypes[0].price).toBe(300);
    });

    it('should filter flights by class type', () => {
      const filters = {
        minPrice: null,
        maxPrice: null,
        classTypes: ['EC'],
      };
      const filteredFlights = service.filterFlights(filters, flights);

      expect(filteredFlights.length).toBe(2);
      expect(filteredFlights[0].classTypes.length).toBe(1);
      expect(filteredFlights[0].classTypes[0].code).toBe('EC');
      expect(filteredFlights[1].classTypes.length).toBe(1);
      expect(filteredFlights[1].classTypes[0].code).toBe('EC');
    });

    it('should filter flights by multiple criteria', () => {
      const filters = {
        minPrice: 200,
        maxPrice: 400,
        classTypes: ['EC', 'business'],
      };
      const filteredFlights = service.filterFlights(filters, flights);

      expect(filteredFlights.length).toBe(2);
      expect(filteredFlights[0].classTypes.length).toBe(2);
      expect(filteredFlights[0].classTypes[0].price).toBe(200);
      expect(filteredFlights[0].classTypes[1].price).toBe(400);
      expect(filteredFlights[1].classTypes.length).toBe(1);
      expect(filteredFlights[1].classTypes[0].price).toBe(300);
    });

    it('should filter out flights with no matching class types', () => {
      const filters = { minPrice: 600, maxPrice: null, classTypes: null };
      const filteredFlights = service.filterFlights(filters, flights);

      expect(filteredFlights.length).toBe(0);
    });
  });
});
