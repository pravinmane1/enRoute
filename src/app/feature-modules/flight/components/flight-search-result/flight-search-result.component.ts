import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { MONTH_NAMES } from '../../../../shared/constants/month-names.constant';
import { selectRouteQueryParams } from '../../../../store/router/router.selectors';
import { Flight } from '../../interfaces/flight-response.interface';
import { fetchFlights } from '../../store/flight.actions';
import {
  selectProcessedFlights,
  selectIsFlightFetching,
} from '../../store/flight.selectors';

@Component({
  selector: 'app-flight-search-result',
  templateUrl: './flight-search-result.component.html',
  styleUrl: './flight-search-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearchResultComponent implements OnInit {
  public searchResult$!: Observable<Flight[] | null>;
  public isFlightFetching$!: Observable<boolean>;
  public queryParams$!: Observable<{
    startDate: string;
    endDate: string | null;
    travellers: string;
    departureCode: string;
    destinationCode: string | null;
  }>;
  public showSortOptions!: boolean;
  public showFilterOptions!: boolean;
  constructor(
    private store: Store,
    private router: Router,
  ) {}
  ngOnInit(): void {
    if (this.getMediaQuery().matches) {
      this.showFilterOptions = true;
      this.showSortOptions = true;
    }

    this.searchResult$ = this.store.select(selectProcessedFlights);
    this.isFlightFetching$ = this.store.select(selectIsFlightFetching);
    this.queryParams$ = this.store.select(selectRouteQueryParams).pipe(
      take(1),
      map((params) => {
        return {
          departureCode: params['departure'],
          destinationCode: params['destination'],
          startDate: this.getFormattedDate(params['departDate']),
          endDate: params['returnDate']
            ? this.getFormattedDate(params['returnDate'])
            : null,
          travellers: this.getDisplayTravellers(
            params['adults'],
            params['children'],
          ),
        };
      }),
    );
    this.store
      .select(selectRouteQueryParams)
      .pipe(
        take(1),
        map((queryParams) =>
          this.store.dispatch(
            fetchFlights({
              departure: queryParams['departure'],
              destination: queryParams['destination'],
            }),
          ),
        ),
      )
      .subscribe();
  }

  getFormattedDate(date: string) {
    const dateSegments = date.split('-');
    return `${MONTH_NAMES[parseInt(dateSegments[1]) - 1]} ${dateSegments[0]}`;
  }

  getDisplayTravellers(adults: string, children: string) {
    let text =
      parseInt(adults) > 1
        ? adults + $localize` Adults`
        : adults + $localize` Adult`;

    if (children) {
      const childText =
        parseInt(children) > 1
          ? children + $localize` Children`
          : children + $localize` Child`;
      text = text + ', ' + childText;
    }
    return text;
  }

  onSortClicked() {
    this.showSortOptions = true;
  }
  onSortClosed() {
    if (this.getMediaQuery().matches) {
      return;
    }
    this.showSortOptions = false;
  }
  onFiltersClicked() {
    this.showFilterOptions = true;
  }
  onFilterClosed() {
    if (this.getMediaQuery().matches) {
      return;
    }
    this.showFilterOptions = false;
  }
  onNavigateBack() {
    this.router.navigate(['flights']);
  }

  getMediaQuery() {
    return window.matchMedia('(min-width: 961px)');
  }
}
