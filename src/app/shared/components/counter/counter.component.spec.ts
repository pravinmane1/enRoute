import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize count to 0 and displayCount to "00"', () => {
    expect(component.count).toBe(0);
    expect(component.displayCount).toBe('00');
  });

  it('should increase count and emit countChange on onIncrease()', () => {
    spyOn(component.countChange, 'emit');
    component.onIncrease();
    expect(component.count).toBe(1);
    expect(component.displayCount).toBe('01');
    expect(component.countChange.emit).toHaveBeenCalledWith(1);
  });

  it('should not increase count beyond maxLimit', () => {
    component.count = component.maxLimit;
    component.onIncrease();
    expect(component.count).toBe(component.maxLimit);
  });

  it('should decrease count and emit countChange on onDecrease()', () => {
    component.count = 5;
    spyOn(component.countChange, 'emit');
    component.onDecrease();
    expect(component.count).toBe(4);
    expect(component.displayCount).toBe('04');
    expect(component.countChange.emit).toHaveBeenCalledWith(4);
  });

  it('should not decrease count below 0', () => {
    component.count = 0;
    component.onDecrease();
    expect(component.count).toBe(0);
    expect(component.displayCount).toBe('00');
  });

  it('should format displayCount correctly', () => {
    component.count = 7;
    component.onIncrease();
    expect(component.displayCount).toBe('08');
    component.count = 10;
    component['formatDisplayCount']();
    expect(component.displayCount).toBe('10');
  });

  it('should format displayCount on ngOnInit', () => {
    component.count = 3;
    component.ngOnInit();
    expect(component.displayCount).toBe('03');
  });

  it('should update displayCount on count input change', () => {
    component.count = 10;
    component.ngOnInit();
    expect(component.displayCount).toBe('10');
  });

  it('should handle maxLimit input correctly', () => {
    component.maxLimit = 10;
    component.count = 10;
    component.onIncrease();
    expect(component.count).toBe(10);
  });
});
