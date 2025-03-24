import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Suggestion } from '../../../../shared/components/suggestion-input/suggestion.interface';
import { CLASS_OPTIONS } from '../../constants/class-options.const';
import { Airport } from '../../interfaces/airport-response.interface';
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
import { FlightSearchModel } from '../../store/flight.state';
import {
  departDateValidator,
  returnDateValidator,
  destinationValidator,
  departureValidator,
} from './custom-validator';

@Component({
  selector: 'app-flight-search-input',
  templateUrl: './flight-search-input.component.html',
  styleUrl: './flight-search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearchInputComponent implements OnInit, OnDestroy {
  public flightSearchInputFormGroup!: FormGroup<{
    departure: FormControl;
    destination: FormControl;
    departDate: FormControl;
    returnDate: FormControl;
    adultsCount: FormControl;
    childrenCount: FormControl;
    classType: FormControl;
  }>;

  flightSearchModel: FlightSearchModel = {
    departure: null,
    destination: null,
    departDate: null,
    returnDate: null,
    travellers: null,
    classType: null,
  };

  public controls = {
    departure: {
      label: $localize`Departure`,
      placeholder: $localize`Airport or City`,
    },
    destination: {
      label: $localize`Destination`,
      placeholder: $localize`Airport or City`,
    },
    dateRangePicker: {
      startTitle: $localize`Select Departure Date`,
      endTitle: $localize`Select Return Date`,
      startLabel: $localize`Depart Date`,
      endLabel: $localize`Return Date`,
    },
    search: {
      value: $localize`Search Flights`,
    },
    classType: {
      placeholder: $localize`Select Class`,
      label: $localize`Class`,
    },
  };

  public classOptions: Suggestion<{ name: string; code: string }>[] = [];

  public isAirportsListLoading$!: Observable<boolean>;
  private destroySubject$ = new Subject<void>();
  public airportsSuggestionList$!: Observable<Suggestion<Airport>[] | null>;
  public departureError$!: Observable<Suggestion<Airport>[] | null>;

  constructor(
    private router: Router,
    private store: Store,
  ) {}
  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
  ngOnInit(): void {
    this.flightSearchInputFormGroup = new FormGroup({
      departure: new FormControl(null),
      destination: new FormControl(null),
      departDate: new FormControl(null),
      returnDate: new FormControl(null, []),
      adultsCount: new FormControl(null, [Validators.required]),
      childrenCount: new FormControl(null, []),
      classType: new FormControl(null, []),
    });

    this.flightSearchInputFormGroup
      .get('departure')
      ?.setValidators([
        Validators.required,
        departureValidator(this.flightSearchInputFormGroup),
      ]);

    this.flightSearchInputFormGroup
      .get('destination')
      ?.setValidators(destinationValidator(this.flightSearchInputFormGroup));

    this.flightSearchInputFormGroup
      .get('departDate')
      ?.setValidators([
        Validators.required,
        departDateValidator(this.flightSearchInputFormGroup),
      ]);

    this.flightSearchInputFormGroup
      .get('returnDate')
      ?.setValidators(returnDateValidator(this.flightSearchInputFormGroup));

    this.airportsSuggestionList$ = this.store.select(selectAirportsList).pipe(
      map((airports) => {
        return (
          airports?.map((airport) => ({
            key: airport.code!,
            displayValue: airport.displayName!,
            data: airport,
          })) || []
        );
      }),
    );

    this.isAirportsListLoading$ = this.store.select(
      selectIsAirportsListLoading,
    );
    this.store.dispatch(fetchPopularAirports());
    this.classOptions = [...CLASS_OPTIONS];

    this.fetchStore();
  }

  public onClassInputChange(
    selectedOption: Suggestion<{ name: string; code: string }>,
  ) {
    this.flightSearchModel.classType = selectedOption.data;
    this.flightSearchInputFormGroup.patchValue({
      classType: selectedOption.key,
    });
  }
  public onDestinationInputChange(selectedOption: Suggestion<Airport>) {
    this.flightSearchModel.destination = selectedOption.data;
    this.flightSearchInputFormGroup.patchValue({
      destination: selectedOption.key || null,
      departure: this.flightSearchModel.departure,
    });
  }
  public onDepartureInputChange(selectedOption: Suggestion<Airport>) {
    this.flightSearchModel.departure = selectedOption.data;
    this.flightSearchInputFormGroup.patchValue({
      departure: selectedOption.key || null,
      destination: this.flightSearchModel.destination,
    });
  }

  public onDepartDateChange(data: { startDate: Date }) {
    this.flightSearchModel.departDate = data.startDate;
    this.flightSearchInputFormGroup.patchValue({
      departDate: data.startDate,
      returnDate: this.flightSearchModel.returnDate,
    });
  }
  public onReturnDateChange(data: { endDate: Date }) {
    this.flightSearchModel.returnDate = data.endDate;
    this.flightSearchInputFormGroup.patchValue({
      returnDate: data.endDate,
      departDate: this.flightSearchModel.departDate,
    });
  }

  private getFormattedDate(date: Date) {
    if (!date) {
      return null;
    }
    const dateNumber =
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const monthNumber =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
    return `${dateNumber}-${monthNumber}-${date.getFullYear()}`;
  }

  public onSearchSubmit() {
    const params = {
      departure: this.flightSearchModel.departure?.code,
      destination: this.flightSearchModel.destination?.code,
      departDate: this.getFormattedDate(this.flightSearchModel.departDate!),
      returnDate: this.getFormattedDate(this.flightSearchModel.returnDate!),
      adults: this.flightSearchModel.travellers?.adults,
      children: this.flightSearchModel.travellers?.children || null,
      classType: this.flightSearchModel.classType?.code,
    };
    this.store.dispatch(setSearchModel(this.flightSearchModel));

    this.router.navigate(['flights', 'search'], {
      queryParams: params,
    });
  }

  public onSearchTextChange(searchText: string) {
    const action = searchText
      ? fetchAirportByText({ searchText })
      : fetchPopularAirports();

    this.store.dispatch(action);
  }

  public onClassSearchTextChange(text: string) {
    this.classOptions = [...CLASS_OPTIONS].filter((classOption) =>
      classOption.displayValue.toLowerCase().startsWith(text.toLowerCase()),
    );
    if (!text) {
      this.flightSearchModel.classType = null;
      this.flightSearchInputFormGroup.patchValue({ classType: null });
    }
  }

  public onTravellersChange(data: {
    adultsCount: number;
    childrenCount: number;
  }) {
    this.flightSearchModel.travellers = {
      adults: data.adultsCount,
      children: data.childrenCount,
    };
    this.flightSearchInputFormGroup.patchValue({
      adultsCount: data.adultsCount,
      childrenCount: data.childrenCount,
    });
  }

  public get isFormDisabled(): boolean {
    return !this.flightSearchInputFormGroup.valid;
  }

  public getErrorMessage(field: string) {
    if (!this.flightSearchInputFormGroup.get(field)?.errors) {
      return '';
    }

    if (this.flightSearchInputFormGroup?.get(field)?.touched) {
      if (this.flightSearchInputFormGroup?.get(field)?.errors?.['required']) {
        return 'Required';
      }
      if (
        this.flightSearchInputFormGroup?.get(field)?.errors?.[
          'returnBeforeDeparture'
        ]
      ) {
        return 'Return cannot be before departure';
      }
      if (
        this.flightSearchInputFormGroup?.get(field)?.errors?.[
          'destinationDepartureEqual'
        ]
      ) {
        return 'Departure and Destionation cannot be same';
      }
    }
    return '';
  }

  public getDatePickerErrorMessage() {
    if (
      !this.flightSearchInputFormGroup.get('departDate')?.errors &&
      !this.flightSearchInputFormGroup.get('returnDate')?.errors
    ) {
      return '';
    }

    if (this.flightSearchInputFormGroup?.get('departDate')?.touched) {
      if (
        this.flightSearchInputFormGroup?.get('departDate')?.errors?.['required']
      ) {
        return 'Daparture date is required';
      }
    }

    if (this.flightSearchInputFormGroup?.get('returnDate')?.touched) {
      if (
        this.flightSearchInputFormGroup?.get('returnDate')?.errors?.[
          'returnBeforeDeparture'
        ]
      ) {
        return 'Return cannot be before departure';
      }
    }

    return '';
  }

  public onCalendarTouched(field: 'startDate' | 'endDate') {
    const fieldMapping = { startDate: 'departDate', endDate: 'returnDate' };
    this.flightSearchInputFormGroup.get(fieldMapping[field])?.markAsTouched();
  }

  private fetchStore() {
    this.store
      .select(selectFlightSearchModel)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((flightSearchModel) => {
        this.flightSearchModel = { ...flightSearchModel };
        const {
          departure,
          destination,
          departDate,
          returnDate,
          travellers,
          classType,
        } = this.flightSearchModel;
        this.flightSearchInputFormGroup.patchValue({
          departure: departure?.code,
          destination: destination?.code,
          departDate: departDate!,
          returnDate: returnDate!,
          adultsCount: travellers && travellers.adults,
          childrenCount: travellers && travellers.children,
          classType: classType && classType.name,
        });
      });
  }

  public onInputTouched(formControlName: string) {
    this.flightSearchInputFormGroup.get(formControlName)?.markAsTouched();
  }
}
