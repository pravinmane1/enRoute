import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelledInputBoxComponent } from './labelled-input-box.component';
import { ChangeDetectorRef, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LabelledInputBoxComponent', () => {
  let component: LabelledInputBoxComponent;
  let fixture: ComponentFixture<LabelledInputBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelledInputBoxComponent],
      providers: [Renderer2],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelledInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit inputClick event on input click', () => {
    spyOn(component.inputClick, 'emit');
    const inputElement = fixture.debugElement.query(
      By.css('.text-input')
    ).nativeElement;
    inputElement.click();
    expect(component.inputClick.emit).toHaveBeenCalled();
  });

  it('should emit inputTextChange event on input text change', () => {
    spyOn(component.inputTextChange, 'emit');
    const inputElement = fixture.debugElement.query(
      By.css('.text-input')
    ).nativeElement;
    inputElement.value = 'test';
    inputElement.dispatchEvent(new KeyboardEvent('keyup'));
    expect(component.inputTextChange.emit).toHaveBeenCalledWith('test');
  });

  it('should emit outSideClick event on outside click', () => {
    spyOn(component.outSideClick, 'emit');
    component.onInputClick();
    document.body.click();
    expect(component.outSideClick.emit).toHaveBeenCalled();
  });

  it('should stop listening for outside clicks when clicked outside', () => {
    spyOn(component.outSideClick, 'emit');
    component.onInputClick();
    document.body.click();
    expect(component.outSideClick.emit).toHaveBeenCalled();
  });

  it('should not emit outSideClick when clicking inside the input box', () => {
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    spyOn(component.outSideClick, 'emit');
    const inputElement = fixture.debugElement.query(
      By.css('.text-input')
    ).nativeElement;
    component.onInputClick();
    inputElement.click();
    expect(component.outSideClick.emit).not.toHaveBeenCalled();
  });

  it('should display the correct input type', () => {
    component.inputType = 'number';
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('.text-input')
    ).nativeElement;
    expect(inputElement.type).toBe('number');
  });

  it('should set input to readonly when readOnly is true', () => {
    component.readOnly = true;
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('.text-input')
    ).nativeElement;
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    expect(inputElement.readOnly).toBeTrue();
  });

  it('should display the correct placeholder text', () => {
    component.placeholder = 'Enter departure';
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('.text-input')
    ).nativeElement;
    expect(inputElement.placeholder).toBe('Enter departure');
  });
});
