import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarDatePickerComponent } from './calendar-date-picker.component';
import { RenderMonth } from '../../interfaces/render-month.interface';
import { DayBlock } from '../../interfaces/day-block.interface';

describe('CalendarDatePickerComponent', () => {
  let component: CalendarDatePickerComponent;
  let fixture: ComponentFixture<CalendarDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarDatePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call processMonths on ngOnInit', () => {
    spyOn(component, 'processMonths');
    component.ngOnInit();
    expect(component.processMonths).toHaveBeenCalled();
  });

  it('should correctly process months', () => {
    component.minDate = new Date(2023, 0, 1);
    component.maxDate = new Date(2023, 2, 31);
    component.processMonths();

    expect(component.renderMonths.length).toBe(3);
    expect(component.renderMonths[0].monthName).toBe('Jan');
    expect(component.renderMonths[1].monthName).toBe('Feb');
    expect(component.renderMonths[2].monthName).toBe('Mar');
  });

  it('should disable past days correctly', () => {
    const today = new Date();
    component.minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    component.maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    component.processMonths();

    const currentMonth = component.renderMonths.find(
      (month) => month.monthIndex === today.getMonth(),
    );
    const pastDays = currentMonth!.dayBlocks.filter(
      (day) => day.displayValue! < today.getDate(),
    );
    const futureDays = currentMonth!.dayBlocks.filter(
      (day) => day.displayValue! >= today.getDate(),
    );
    pastDays.forEach((day) => expect(day.isDisabled).toBeTrue());
    futureDays.forEach((day) => expect(day.isDisabled).toBeFalse());
  });

  it('should emit selected date on day click', () => {
    spyOn(component.calendarDateSelected, 'emit');
    const month: RenderMonth = {
      monthName: 'January',
      year: 2023,
      days: 31,
      dayBlocks: [],
      monthIndex: 0,
    };
    const day: DayBlock = {
      displayValue: 15,
      isDisabled: false,
      isToday: false,
    };
    component.onDayClicked(month, day);

    expect(component.calendarDateSelected.emit).toHaveBeenCalledWith(
      new Date(2023, 0, 15),
    );
  });

  it('should not emit selected date on disabled day click', () => {
    spyOn(component.calendarDateSelected, 'emit');
    const month: RenderMonth = {
      monthName: 'January',
      year: 2023,
      days: 31,
      dayBlocks: [],
      monthIndex: 0,
    };
    const day: DayBlock = {
      displayValue: 15,
      isDisabled: true,
      isToday: false,
    };
    component.onDayClicked(month, day);

    expect(component.calendarDateSelected.emit).not.toHaveBeenCalled();
  });

  it('should not emit selected date on null day click', () => {
    spyOn(component.calendarDateSelected, 'emit');
    const month: RenderMonth = {
      monthName: 'January',
      year: 2023,
      days: 31,
      dayBlocks: [],
      monthIndex: 0,
    };
    const day: DayBlock = {
      displayValue: null,
      isDisabled: false,
      isToday: false,
    };
    component.onDayClicked(month, day);

    expect(component.calendarDateSelected.emit).not.toHaveBeenCalled();
  });

  it('should emit close event on close click', () => {
    spyOn(component.closeClicked, 'emit');
    component.onCloseClick();

    expect(component.closeClicked.emit).toHaveBeenCalled();
  });
});
