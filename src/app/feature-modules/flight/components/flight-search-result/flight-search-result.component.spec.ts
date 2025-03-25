import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { fetchFlights } from '../../store/flight.actions';
import {
  selectProcessedFlights,
  selectIsFlightFetching,
} from '../../store/flight.selectors';
import { selectRouteQueryParams } from '../../../../store/router/router.selectors';
import { FlightSearchResultComponent } from './flight-search-result.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

describe('FlightSearchResultComponent', () => {
  let component: FlightSearchResultComponent;
  let fixture: ComponentFixture<FlightSearchResultComponent>;
  let store: Store;
  let router: Router;

  const mockFlights = [
    {
      id: 1,
      departure: 'PUN',
      destination: 'DEL',
      price: 500,
      airlineLogo: 'assets/airlines/air-india.png',
      stops: [],
    },
    {
      id: 2,
      departure: 'PUN',
      destination: 'DEL',
      price: 700,
      airlineLogo: 'assets/airlines/air-india.png',
      stops: [],
    },
  ];

  const mockQueryParams = {
    departure: 'PUN',
    destination: 'DEL',
    departDate: '01-06-2024',
    returnDate: '10-06-2024',
    adults: '2',
    children: '1',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightSearchResultComponent],
      imports: [StoreModule.forRoot({}), NgOptimizedImage],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchResultComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callFake((selector: unknown) => {
      if (selector === selectProcessedFlights) {
        return of(mockFlights);
      } else if (selector === selectIsFlightFetching) {
        return of(false);
      } else if (selector === selectRouteQueryParams) {
        return of(mockQueryParams);
      }
      return of(null);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch flights based on query params', () => {
    fixture.detectChanges();

    expect(component.searchResult$).toBeTruthy();
    expect(component.isFlightFetching$).toBeTruthy();
    expect(component.queryParams$).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchFlights({ departure: 'PUN', destination: 'DEL' })
    );
  });

  it('should format date correctly', () => {
    const formattedDate = component.getFormattedDate('01-06-2024');
    expect(formattedDate).toBe('Jun 01');
  });

  it('should display correct traveller text', () => {
    expect(component.getDisplayTravellers('2', '1')).toBe('2 Adults, 1 Child');
    expect(component.getDisplayTravellers('1', '')).toBe('1 Adult');
  });

  it('should show and hide sort options correctly', () => {
    component.onSortClicked();
    expect(component.showSortOptions).toBeTrue();
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
    } as MediaQueryList);
    component.onFilterClosed();
    component.onSortClosed();
    expect(component.showSortOptions).toBeFalse();
  });

  it('should show and hide filter options correctly', () => {
    component.onFiltersClicked();
    expect(component.showFilterOptions).toBeTrue();
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
    } as MediaQueryList);
    component.onFilterClosed();
    expect(component.showFilterOptions).toBeFalse();
  });

  it('should navigate back to flights', () => {
    component.onNavigateBack();
    expect(router.navigate).toHaveBeenCalledWith(['flights']);
  });

  it('should maintain sort and filter options visibility on larger screens', () => {
    component.showSortOptions = true;
    component.showFilterOptions = true;
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
    } as MediaQueryList);

    component.onSortClosed();
    component.onFilterClosed();

    expect(component.showSortOptions).toBeTrue();
    expect(component.showFilterOptions).toBeTrue();
  });

  it('should toggle sort and filter options visibility on smaller screens', () => {
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
    } as MediaQueryList);

    component.onSortClicked();
    component.onSortClosed();

    expect(component.showSortOptions).toBeFalse();

    component.onFiltersClicked();
    component.onFilterClosed();

    expect(component.showFilterOptions).toBeFalse();
  });
});
