import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionInputComponent } from './suggestion-input.component';
import { Suggestion } from './suggestion.interface';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';

describe('SuggestionInputComponent', () => {
  let component: SuggestionInputComponent<null>;
  let fixture: ComponentFixture<SuggestionInputComponent<null>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionInputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      SuggestionInputComponent,
    ) as ComponentFixture<SuggestionInputComponent<null>>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchTextChanged event on input text change', () => {
    spyOn(component.searchTextChanged, 'emit');
    component.onInputTextChange('test');
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(component.searchTextChanged.emit).toHaveBeenCalledWith('test');
  });

  it('should set isSuggestionBoxOpen to true on input click', () => {
    component.onInputClick();
    expect(component.isSuggestionBoxOpen).toBeTrue();
  });

  it('should close suggestion box and emit selectionChanged with empty values on outside click if isSelectedTextDirty is true', () => {
    spyOn(component.selectionChanged, 'emit');
    component['isSelectedTextDirty'] = true;
    component.isSuggestionBoxOpen = true;
    component.onOutSideClick();
    expect(component.isSuggestionBoxOpen).toBeFalse();
    expect(component.selectionChanged.emit).toHaveBeenCalledWith({
      key: '',
      data: null,
      displayValue: '',
    });
  });

  it('should not emit selectionChanged on outside click if suggestion box is not open', () => {
    spyOn(component.selectionChanged, 'emit');
    component.isSuggestionBoxOpen = false;
    component.onOutSideClick();
    expect(component.selectionChanged.emit).not.toHaveBeenCalled();
  });

  it('should update selectedSuggestionOption and emit selectionChanged on suggestion click', () => {
    const suggestion: Suggestion<null> = {
      key: '1',
      displayValue: 'Suggestion',
      data: null,
    };
    spyOn(component.selectionChanged, 'emit');
    component.onSuggestionClick(suggestion);
    expect(component.selectedSuggestionOption).toEqual(suggestion);
    expect(component.selectionChanged.emit).toHaveBeenCalledWith(suggestion);
  });

  it('should set displayValue of selectedSuggestionOption when selectedValue input is set', () => {
    component.selectedValue = 'test';
    expect(component.selectedSuggestionOption.displayValue).toBe('test');
  });

  it('should emit empty displayValue and start searchTextChanged on empty input text', () => {
    component.onInputTextChange('');
    expect(component.selectedSuggestionOption.displayValue).toBe('');
    component.inputTextChange$.subscribe((text: string) => {
      expect(text).toBe('');
    });
  });
});
