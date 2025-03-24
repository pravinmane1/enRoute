import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsHomeComponent } from './hotels-home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HotelsHomeComponent', () => {
  let component: HotelsHomeComponent;
  let fixture: ComponentFixture<HotelsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelsHomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
