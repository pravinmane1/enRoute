import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Suggestion } from '../../../../shared/components/suggestion-input/suggestion.interface';
import { CLASS_OPTIONS } from '../../constants/class-options.const';
import {
  fetchPopularAirports,
  setSearchModel,
  fetchAirportByText,
} from '../../store/flight.actions';
import {
  selectAirportsList,
  selectIsAirportsListLoading,
  selectFlightSearchModel,
} from '../../store/flight.selectors';
import { FlightSearchInputComponent } from './flight-search-input.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FlightSearchInputComponent', () => {
  let component: FlightSearchInputComponent;
  let fixture: ComponentFixture<FlightSearchInputComponent>;
  let store: Store;
  let router: Router;

  const mockAirportsList = [
    {
      code: 'PUN',
      displayName: 'Pune International Airport',
      country: 'India',
      city: 'Pune',
    },
    {
      code: 'DEL',
      displayName: 'India Gandhi Delhi Airport',
      country: 'India',
      city: 'Pune',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightSearchInputComponent],
      imports: [ReactiveFormsModule, FormsModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchInputComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callFake((selector: unknown) => {
      if (selector === selectAirportsList) {
        return of(mockAirportsList);
      } else if (selector === selectIsAirportsListLoading) {
        return of(false);
      } else if (selector === selectFlightSearchModel) {
        return of({
          departure: {
            code: 'PUN',
            displayName: 'Pune International Airport',
            country: 'India',
            city: 'Pune',
          },
          destination: {
            code: 'DEL',
            displayName: 'India Gandhi Delhi Airport',
            country: 'India',
            city: 'Delhi',
          },
          departDate: new Date('2024-06-01'),
          returnDate: new Date('2024-06-10'),
          travellers: { adults: 2, children: 1 },
          classType: { code: 'EC', name: 'economy' },
        });
      }
      return of(null);
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values and fetch popular airports', () => {
    fixture.detectChanges();

    expect(component.flightSearchInputFormGroup).toBeTruthy();
    expect(component.flightSearchInputFormGroup.value).toEqual({
      departure: 'PUN',
      destination: 'DEL',
      departDate: new Date('2024-06-01'),
      returnDate: new Date('2024-06-10'),
      adultsCount: 2,
      childrenCount: 1,
      classType: 'economy',
    });
    expect(store.dispatch).toHaveBeenCalledWith(fetchPopularAirports());
  });

  it('should dispatch fetchPopularAirports or fetchAirportByText based on search text', () => {
    component.onSearchTextChange('');
    expect(store.dispatch).toHaveBeenCalledWith(fetchPopularAirports());

    component.onSearchTextChange('New');
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchAirportByText({ searchText: 'New' }),
    );
  });

  it('should update flightSearchModel on class input change', () => {
    const selectedOption: Suggestion<{ code: string; name: string }> = {
      key: 'EC',
      displayValue: 'Economy',
      data: { code: 'EC', name: 'Economy' },
    };
    component.onClassInputChange(selectedOption);
    expect(component.flightSearchModel.classType).toEqual(selectedOption.data);
    expect(component.flightSearchInputFormGroup.get('classType')?.value).toBe(
      'EC',
    );
  });

  it('should update flightSearchModel on destination input change', () => {
    const selectedOption: Suggestion<{ code: string; displayName: string }> = {
      key: 'PUN',
      displayValue: 'Pune International Airport',
      data: { code: 'PUN', displayName: 'Pune International Airport' },
    };
    component.onDestinationInputChange(selectedOption);
    expect(component.flightSearchModel.destination).toEqual(
      selectedOption.data,
    );
    expect(component.flightSearchInputFormGroup.get('destination')?.value).toBe(
      'PUN',
    );
  });

  it('should update flightSearchModel on departure input change', () => {
    const selectedOption: Suggestion<{ code: string; displayName: string }> = {
      key: 'DEL',
      displayValue: 'India Gandhi Delhi Airport',
      data: { code: 'DEL', displayName: 'India Gandhi Delhi Airport' },
    };
    component.onDepartureInputChange(selectedOption);
    expect(component.flightSearchModel.departure).toEqual(selectedOption.data);
    expect(component.flightSearchInputFormGroup.get('departure')?.value).toBe(
      'DEL',
    );
  });

  it('should format date correctly', () => {
    const date = new Date('2024-06-01');
    expect(component['getFormattedDate'](date)).toBe('01-06-2024');
  });

  it('should dispatch setSearchModel and navigate on search submit', () => {
    component.onSearchSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(
      setSearchModel(component.flightSearchModel),
    );
    expect(router.navigate).toHaveBeenCalledWith(['flights', 'search'], {
      queryParams: {
        departure: 'PUN',
        destination: 'DEL',
        departDate: '01-06-2024',
        returnDate: '10-06-2024',
        adults: 2,
        children: 1,
        classType: 'EC',
      },
    });
  });

  it('should filter class options based on search text', () => {
    component.onClassSearchTextChange('Econ');
    expect(component.classOptions.length).toBe(1);
    expect(component.classOptions[0].displayValue).toBe('Economy');

    component.onClassSearchTextChange('');
    expect(component.classOptions).toEqual(CLASS_OPTIONS);

    component.onClassSearchTextChange('Nonexistent');
    expect(component.classOptions.length).toBe(0);
  });

  it('should update travellers count on travellers change', () => {
    component.onTravellersChange({ adultsCount: 3, childrenCount: 2 });
    expect(component.flightSearchModel.travellers).toEqual({
      adults: 3,
      children: 2,
    });
    expect(component.flightSearchInputFormGroup.get('adultsCount')?.value).toBe(
      3,
    );
    expect(
      component.flightSearchInputFormGroup.get('childrenCount')?.value,
    ).toBe(2);
  });

  it('should return error message for a form field', () => {
    component.flightSearchInputFormGroup
      .get('departure')
      ?.setErrors({ required: true });
    component.flightSearchInputFormGroup.get('departure')?.markAsTouched();
    expect(component.getErrorMessage('departure')).toBe('Required');

    component.flightSearchInputFormGroup
      .get('returnDate')
      ?.setErrors({ returnBeforeDeparture: true });
    component.flightSearchInputFormGroup.get('returnDate')?.markAsTouched();
    expect(component.getErrorMessage('returnDate')).toBe(
      'Return cannot be before departure',
    );
  });

  it('should mark form field as touched on input touched', () => {
    component.onInputTouched('departure');
    expect(
      component.flightSearchInputFormGroup.get('departure')?.touched,
    ).toBeTrue();
  });

  it('should mark date picker field as touched on calendar touched', () => {
    component.onCalendarTouched('startDate');
    expect(
      component.flightSearchInputFormGroup.get('departDate')?.touched,
    ).toBeTrue();

    component.onCalendarTouched('endDate');
    expect(
      component.flightSearchInputFormGroup.get('returnDate')?.touched,
    ).toBeTrue();
  });

  it('should disable form submission if form is invalid', () => {
    component.flightSearchInputFormGroup
      .get('departure')
      ?.setErrors({ required: true });
    expect(component.isFormDisabled).toBeTrue();

    component.flightSearchInputFormGroup.get('departure')?.setErrors(null);
    component.flightSearchInputFormGroup
      .get('departDate')
      ?.setErrors({ required: true });
    expect(component.isFormDisabled).toBeTrue();
  });
});
