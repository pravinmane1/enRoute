import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { SortFlightsComponent } from './sort-flights.component';
import { sortFlights } from '../../store/flight.actions';
import { By } from '@angular/platform-browser';

type fieldType =
  | 'airlineName'
  | 'arrivalInMillies'
  | 'departureInMillies'
  | 'durationInMillies'
  | 'price';

describe('SortFlightsComponent', () => {
  let component: SortFlightsComponent;
  let fixture: ComponentFixture<SortFlightsComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortFlightsComponent],
      imports: [StoreModule.forRoot({}, {})],
      providers: [
        {
          provide: Store,
          useValue: {
            select: jasmine.createSpy().and.returnValue(of(null)),
            dispatch: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(SortFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sortClosed when onCloseClick is called', () => {
    spyOn(component.sortClosed, 'emit');

    component.onCloseClick();

    expect(component.sortClosed.emit).toHaveBeenCalled();
  });

  it('should dispatch sortFlights action when onClickDone is called', () => {
    component.selectedSortOption = {
      title: 'Price (Lowest to Highest)',
      field: 'price',
      sortDir: 1,
      isChecked: true,
    };

    component.onClickDone();

    expect(store.dispatch).toHaveBeenCalledWith(
      sortFlights(component.selectedSortOption)
    );
  });

  it('should call onCloseClick when onClickDone is called', () => {
    spyOn(component, 'onCloseClick');

    component.selectedSortOption = {
      title: 'Price (Lowest to Highest)',
      field: 'price',
      sortDir: 1,
      isChecked: true,
    };

    component.onClickDone();

    expect(component.onCloseClick).toHaveBeenCalled();
  });

  it('should set selectedSortOption when onSortSelected is called', () => {
    const sortOption = {
      title: 'Duration (Longest to Shortest)',
      field: 'durationInMillies' as fieldType,
      sortDir: -1,
      isChecked: true,
    };

    component.onSortSelected(sortOption);

    expect(component.selectedSortOption).toEqual(sortOption);
  });

  it('should check sort option and set selectedSortOption on initialization', () => {
    const selectedOption = {
      title: 'Price (Lowest to Highest)',
      field: 'price' as fieldType,
      sortDir: 1,
      isChecked: true,
    };

    component.ngOnInit();
    component.onSortSelected(selectedOption);
    expect(component.selectedSortOption).toEqual(selectedOption);
  });

  it('should render sort options', () => {
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('.sort-option'));
    expect(options.length).toBe(component.sortOptions.length);
  });

  it('should call onSortSelected when sort option is clicked', () => {
    spyOn(component, 'onSortSelected');
    fixture.detectChanges();

    const optionElement = fixture.debugElement.query(By.css('.sort-option'));
    optionElement.triggerEventHandler('click', null);

    expect(component.onSortSelected).toHaveBeenCalled();
  });
});
