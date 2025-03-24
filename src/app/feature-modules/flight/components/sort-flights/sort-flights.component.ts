import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { sortFlights } from '../../store/flight.actions';
import { selectSortOption } from '../../store/flight.selectors';

@Component({
  selector: 'app-sort-flights',
  templateUrl: './sort-flights.component.html',
  styleUrl: './sort-flights.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortFlightsComponent implements OnInit {
  @Output() sortClosed = new EventEmitter();
  public selectedSortOption!: {
    title: string;
    field:
      | 'airlineName'
      | 'arrivalInMillies'
      | 'departureInMillies'
      | 'durationInMillies'
      | 'price';
    sortDir: number;
    isChecked: boolean;
  };
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.select(selectSortOption).subscribe((sortOption) => {
      if (!sortOption) {
        return;
      }
      const selectedOption = this.sortOptions.find(
        (sortOpt) => sortOpt.title === sortOption?.title,
      )!;
      selectedOption.isChecked = true;
      this.selectedSortOption = selectedOption;
    });
  }

  public sortOptions: {
    title: string;
    field:
      | 'airlineName'
      | 'arrivalInMillies'
      | 'departureInMillies'
      | 'durationInMillies'
      | 'price';
    sortDir: number;
    isChecked: boolean;
  }[] = [
    {
      title: $localize`Price (Lowest to Highest)`,
      field: 'price',
      sortDir: 1,
      isChecked: false,
    },
    {
      title: $localize`Price (Highest to Lowest)`,
      field: 'price',
      sortDir: -1,
      isChecked: false,
    },
    {
      title: $localize`Duration (Shortest to Longest)`,
      field: 'durationInMillies',
      sortDir: 1,
      isChecked: false,
    },
    {
      title: $localize`Duration (Longest to Shortest)`,
      field: 'durationInMillies',
      sortDir: -1,
      isChecked: false,
    },
    {
      title: $localize`Departure (Earliest to Latest)`,
      field: 'departureInMillies',
      sortDir: 1,
      isChecked: false,
    },
    {
      title: $localize`Arrival (Earliest to Latest)`,
      field: 'arrivalInMillies',
      sortDir: 1,
      isChecked: false,
    },
    {
      title: $localize`Airline (A to Z)`,
      field: 'airlineName',
      sortDir: 1,
      isChecked: false,
    },
    {
      title: $localize`Airline (Z to A)`,
      field: 'airlineName',
      sortDir: -1,
      isChecked: false,
    },
  ];
  onCloseClick() {
    this.sortClosed.emit();
  }
  onSortSelected(sortOption: {
    title: string;
    field:
      | 'airlineName'
      | 'arrivalInMillies'
      | 'departureInMillies'
      | 'durationInMillies'
      | 'price';
    sortDir: number;
    isChecked: boolean;
  }) {
    this.selectedSortOption = sortOption;
  }

  onClickDone() {
    if (this.selectedSortOption) {
      this.store.dispatch(sortFlights(this.selectedSortOption));
    }
    this.onCloseClick();
  }
}
