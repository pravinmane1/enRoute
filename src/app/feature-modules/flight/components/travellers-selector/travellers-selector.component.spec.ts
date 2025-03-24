import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { TravellersSelectorComponent } from './travellers-selector.component';

describe('TravellersSelectorComponent', () => {
  let component: TravellersSelectorComponent;
  let fixture: ComponentFixture<TravellersSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravellersSelectorComponent],
      providers: [Renderer2],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TravellersSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update travellersDisplay on input changes', () => {
    component.adultsCount = 2;
    component.childrenCount = 3;
    component.ngOnChanges();
    expect(component.travellersDisplay).toBe('2 Adults, 3 Children');
  });

  it('should emit selectionChanged on onSubmit', () => {
    spyOn(component.selectionChanged, 'emit');
    component.adultsCount = 2;
    component.childrenCount = 1;

    component.onSubmit();

    expect(component.selectionChanged.emit).toHaveBeenCalledWith({
      adultsCount: 2,
      childrenCount: 1,
    });
  });

  it('should disable submit button if adultsCount is 0', () => {
    component.adultsCount = 0;
    fixture.detectChanges();

    expect(component.isSubmitDisabled).toBeTrue();
  });

  it('should enable submit button if adultsCount is greater than 0', () => {
    component.adultsCount = 1;
    fixture.detectChanges();

    expect(component.isSubmitDisabled).toBeFalse();
  });

  it('should open popover on input click', () => {
    spyOn(component.isPopoverOpen$, 'next');
    component.onInputClicked();

    expect(component.isPopoverOpen$.next).toHaveBeenCalledWith(true);
  });

  it('should update adultsCount on onAdultsCountChange', () => {
    component.onAdultsCountChange(3);
    expect(component.adultsCount).toBe(3);
  });

  it('should update childrenCount on onChildrenCountChange', () => {
    component.onChildrenCountChange(2);
    expect(component.childrenCount).toBe(2);
  });
});
