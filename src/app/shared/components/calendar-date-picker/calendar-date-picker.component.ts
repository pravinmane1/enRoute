import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CALENDAR_DAY_NAMES } from '../../constants/day-names.constant';
import { MONTH_NAMES } from '../../constants/month-names.constant';
import { RenderMonth } from '../../interfaces/render-month.interface';
import { DayBlock } from '../../interfaces/day-block.interface';

@Component({
  selector: 'app-calendar-date-picker',
  templateUrl: './calendar-date-picker.component.html',
  styleUrl: './calendar-date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDatePickerComponent implements OnInit {
  @Input() title: string = '';
  @Input() minDate: Date = new Date();
  @Input() maxDate: Date = new Date();
  @Input() selectedDate!: Date;
  @Output() closeClicked = new EventEmitter();
  @Output() calendarDateSelected = new EventEmitter();
  public today = new Date();
  public days = [...CALENDAR_DAY_NAMES];
  public monthNames = [...MONTH_NAMES];
  public renderMonths: RenderMonth[] = [];

  ngOnInit(): void {
    this.processMonths();
  }
  processMonths() {
    if (this.minDate.getTime() > this.maxDate.getTime()) {
      return;
    }

    const monthIteration = new Date(this.minDate);
    monthIteration.setDate(1);
    const monthIterationUntil = new Date(this.maxDate);
    monthIterationUntil.setDate(1);

    const renderMonths: RenderMonth[] = [];
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const nowDate = now.getDate();

    while (monthIteration.getTime() <= monthIterationUntil.getTime()) {
      const totalDayBlocks: DayBlock[] = [];
      const emptyBlocks = monthIteration.getDay() - 1;
      for (let i = 0; i < emptyBlocks; i++) {
        totalDayBlocks.push({
          displayValue: null,
          isDisabled: true,
          isToday: false,
        });
      }
      const daysInCurrentMonth = new Date(
        monthIteration.getFullYear(),
        monthIteration.getMonth() + 1,
        0
      ).getDate();

      for (let i = 0; i < daysInCurrentMonth; i++) {
        const date = i + 1;
        const isDisabled =
          monthIteration.getFullYear() === nowYear &&
          monthIteration.getMonth() === nowMonth &&
          date < nowDate;

        const isToday =
          monthIteration.getFullYear() === nowYear &&
          monthIteration.getMonth() === nowMonth &&
          date === nowDate;
        totalDayBlocks.push({ displayValue: date, isDisabled, isToday });
      }

      const month = {
        monthName: this.monthNames[monthIteration.getMonth()],
        year: monthIteration.getFullYear(),
        days: daysInCurrentMonth,
        dayBlocks: totalDayBlocks,
        monthIndex: monthIteration.getMonth(),
      };

      renderMonths.push(month);

      monthIteration.setMonth(monthIteration.getMonth() + 1);
    }
    this.renderMonths = [...renderMonths];
  }

  public onDayClicked(month: RenderMonth, day: DayBlock) {
    if (day.isDisabled || !day.displayValue) {
      return;
    }

    this.calendarDateSelected.emit(
      new Date(month.year, month.monthIndex, day.displayValue)
    );
  }

  onCloseClick() {
    this.closeClicked.emit();
  }
}
