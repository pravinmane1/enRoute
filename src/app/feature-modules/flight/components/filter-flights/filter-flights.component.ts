import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CLASS_OPTIONS } from '../../constants/class-options.const';
import { filterFlights } from '../../store/flight.actions';
import { selectFilters } from '../../store/flight.selectors';

@Component({
  selector: 'app-filter-flights',
  templateUrl: './filter-flights.component.html',
  styleUrl: './filter-flights.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterFlightsComponent implements OnInit {
  @Output() filterClosed = new EventEmitter();
  public minimumPrice!: string;
  public maximumPrice!: string;
  public classOptions = [...CLASS_OPTIONS].map((classType) => ({
    ...classType,
    isChecked: false,
  }));

  public controls = {
    minimumPrice: {
      label: $localize`Minimum Price`,
      prefix: $localize`$`,
    },
    maximumPrice: {
      label: $localize`Maximum Price`,
      prefix: $localize`$`,
    },
  };

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.select(selectFilters).subscribe((filters) => {
      if (!filters) {
        return;
      }

      this.minimumPrice = filters.minPrice?.toString() || '';
      this.maximumPrice = filters.maxPrice?.toString() || '';

      this.classOptions.forEach((classOption) => {
        classOption.isChecked = !!filters.classTypes?.includes(classOption.key);
      });
    });
  }
  onCloseClick() {
    this.filterClosed.emit();
  }

  onInputTextChange(value: string, type: string) {
    if (type === 'minimum') {
      this.minimumPrice = value;
    } else {
      this.maximumPrice = value;
    }
  }

  get isApplyDisabled() {
    return (
      !this.maximumPrice &&
      !this.minimumPrice &&
      !this.classOptions.some((c) => c.isChecked)
    );
  }
  onResetClick() {
    this.minimumPrice = '';
    this.maximumPrice = '';
    this.classOptions.forEach((classOption) => (classOption.isChecked = false));
    this.store.dispatch(
      filterFlights({
        minPrice: null,
        maxPrice: null,
        classTypes: null,
      }),
    );
  }

  onFilterSubmit() {
    this.store.dispatch(
      filterFlights({
        minPrice: parseInt(this.minimumPrice),
        maxPrice: parseInt(this.maximumPrice),
        classTypes: this.classOptions
          .filter((c) => c.isChecked)
          .map((c) => c.key),
      }),
    );
    this.onCloseClick();
  }
}
