import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterFlightsComponent } from './filter-flights.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { filterFlights } from '../../store/flight.actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FilterFlightsComponent', () => {
  let component: FilterFlightsComponent;
  let fixture: ComponentFixture<FilterFlightsComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterFlightsComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterFlightsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'select').and.returnValue(
      of({
        minPrice: 100,
        maxPrice: 500,
        classTypes: ['economy'],
      })
    );
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct filter values', () => {
    component.ngOnInit();
    expect(component.minimumPrice).toBe('100');
    expect(component.maximumPrice).toBe('500');
    expect(component.classOptions[0].isChecked).toBe(false);
  });

  it('should emit filterClosed event on close', () => {
    spyOn(component.filterClosed, 'emit');
    component.onCloseClick();
    expect(component.filterClosed.emit).toHaveBeenCalled();
  });

  it('should update minimumPrice on input change', () => {
    component.onInputTextChange('200', 'minimum');
    expect(component.minimumPrice).toBe('200');
  });

  it('should update maximumPrice on input change', () => {
    component.onInputTextChange('800', 'maximum');
    expect(component.maximumPrice).toBe('800');
  });

  it('should disable apply button if no filters are set', () => {
    component.minimumPrice = '';
    component.maximumPrice = '';
    component.classOptions.forEach((option) => (option.isChecked = false));
    expect(component.isApplyDisabled).toBe(true);
  });

  it('should enable apply button if any filter is set', () => {
    component.minimumPrice = '100';
    component.maximumPrice = '';
    component.classOptions.forEach((option) => (option.isChecked = false));
    expect(component.isApplyDisabled).toBe(false);

    component.minimumPrice = '';
    component.classOptions[0].isChecked = true;
    expect(component.isApplyDisabled).toBe(false);
  });

  it('should reset filters on reset click', () => {
    component.onResetClick();
    expect(component.minimumPrice).toBe('');
    expect(component.maximumPrice).toBe('');
    component.classOptions.forEach((option) => {
      expect(option.isChecked).toBe(false);
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      filterFlights({
        minPrice: null,
        maxPrice: null,
        classTypes: null,
      })
    );
  });

  it('should submit filters on filter submit', () => {
    spyOn(component.filterClosed, 'emit');
    component.minimumPrice = '100';
    component.maximumPrice = '500';
    component.classOptions[0].isChecked = true;

    component.onFilterSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      filterFlights({
        minPrice: 100,
        maxPrice: 500,
        classTypes: [component.classOptions[0].key],
      })
    );
    expect(component.filterClosed.emit).toHaveBeenCalled();
  });
});
