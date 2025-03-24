import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateRangePickerComponent } from './date-range-picker.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangePickerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set displayStartDate when selectedStartDate is set', () => {
    const date = new Date(2024, 0, 1);
    component.selectedStartDate = date;
    expect(component.displayStartDate).toBe('Mon, Jan 1');
  });

  it('should set displayEndDate when selectedEndDate is set', () => {
    const date = new Date(2024, 0, 2);
    component.selectedEndDate = date;
    expect(component.displayEndDate).toBe('Tue, Jan 2');
  });

  it('should show calendar and set selection mode to startDate on start date input click', () => {
    component.startDatePickerTitle = 'Start Date';
    component.onInputClick('startDate');
    expect(component.selectionMode).toBe('startDate');
    expect(component.datePickerTitle).toBe('Start Date');
    expect(component.isCalendarVisible).toBeTrue();
  });

  it('should show calendar and set selection mode to endDate on end date input click', () => {
    component.endDatePickerTitle = 'End Date';
    component.onInputClick('endDate');
    expect(component.selectionMode).toBe('endDate');
    expect(component.datePickerTitle).toBe('End Date');
    expect(component.isCalendarVisible).toBeTrue();
  });

  it('should hide calendar on outside click', () => {
    component.isCalendarVisible = true;
    component.selectionMode = 'startDate';
    component.onOutSideClick('startDate');
    expect(component.isCalendarVisible).toBeFalse();
  });

  it('should close calendar and emit calendarTouched on closeCalendar', () => {
    spyOn(component.calendarTouched, 'emit');
    component.selectionMode = 'startDate';
    component.closeCalendar();
    expect(component.isCalendarVisible).toBeFalse();
    expect(component.calendarTouched.emit).toHaveBeenCalledWith('startDate');
  });

  it('should emit startDateChanged with correct values on calendar date select for startDate', () => {
    spyOn(component.startDateChanged, 'emit');
    const date = new Date(2024, 0, 1);
    component.selectionMode = 'startDate';
    component.onCalendarDateSelect(date);
    expect(component.displayStartDate).toBe('Mon, Jan 1');
    expect(component.startDateChanged.emit).toHaveBeenCalledWith({
      displayStartDate: 'Mon, Jan 1',
      startDate: date,
    });
  });

  it('should emit endDateChanged with correct values on calendar date select for endDate', () => {
    spyOn(component.endDateChanged, 'emit');
    const date = new Date(2024, 0, 2);
    component.selectionMode = 'endDate';
    component.onCalendarDateSelect(date);
    expect(component.displayEndDate).toBe('Tue, Jan 2');
    expect(component.endDateChanged.emit).toHaveBeenCalledWith({
      displayEndDate: 'Tue, Jan 2',
      endDate: date,
    });
  });

  it('should format date correctly', () => {
    const date = new Date(2024, 0, 1);
    const formattedDate = component['formatDate'](date);
    expect(formattedDate).toBe('Mon, Jan 1');
  });
});
