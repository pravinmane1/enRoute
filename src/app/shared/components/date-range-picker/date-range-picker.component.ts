import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FORMAT_DAY_NAMES } from '../../constants/day-names.constant';
import { MONTH_NAMES } from '../../constants/month-names.constant';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerComponent {
  @Input() startDatePickerTitle!: string;
  @Input() endDatePickerTitle!: string;

  @Input() startDatePickerLabel!: string;
  @Input() endDatePickerLabel!: string;

  @Input() errorMessage!: string;

  @Input() set selectedStartDate(selectedStartDate: Date) {
    if (selectedStartDate) {
      this.displayStartDate = this.formatDate(selectedStartDate);
    }
  }
  @Input() set selectedEndDate(selectedEndDate: Date) {
    if (selectedEndDate) {
      this.displayEndDate = this.formatDate(selectedEndDate);
    }
  }
  @Output() startDateChanged = new EventEmitter();
  @Output() endDateChanged = new EventEmitter();
  @Output() calendarTouched = new EventEmitter();

  displayStartDate: string = '';

  displayEndDate: string = '';

  selectionMode!: 'startDate' | 'endDate';

  calendarMinDate!: Date;
  calendarMaxDate!: Date;
  selectedCalendarDate!: Date;
  datePickerTitle!: string;
  isCalendarVisible: boolean = false;
  placeholder: string = $localize`Enter Date`;

  onInputClick(dateType: 'startDate' | 'endDate') {
    this.selectionMode = dateType;
    const now = new Date();
    this.calendarMinDate = new Date(now);

    const future = new Date();
    future.setFullYear(now.getFullYear() + 1);
    this.calendarMaxDate = new Date(future);

    if (dateType === 'startDate') {
      this.datePickerTitle = this.startDatePickerTitle;
    } else {
      this.datePickerTitle = this.endDatePickerTitle;
    }
    this.isCalendarVisible = true;
  }
  onOutSideClick(dateType: string) {
    if (this.isCalendarVisible && dateType === this.selectionMode) {
      this.closeCalendar();
    }
  }

  closeCalendar() {
    this.isCalendarVisible = false;
    this.calendarTouched.emit(this.selectionMode);
  }

  public onCalendarDateSelect(date: Date) {
    const displayDate = this.formatDate(date);

    if (this.selectionMode === 'startDate') {
      this.displayStartDate = displayDate;
      this.startDateChanged.emit({
        displayStartDate: this.displayStartDate,
        startDate: date,
      });
    } else {
      this.displayEndDate = displayDate;
      this.endDateChanged.emit({
        displayEndDate: this.displayEndDate,
        endDate: date,
      });
    }
    this.closeCalendar();
  }

  private formatDate(date: Date): string {
    return `${FORMAT_DAY_NAMES[date.getDay()]}, ${
      MONTH_NAMES[date.getMonth()]
    } ${date.getDate()}`;
  }
}
