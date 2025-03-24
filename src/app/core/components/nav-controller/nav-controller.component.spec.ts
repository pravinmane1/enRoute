import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { NavControllerComponent } from './nav-controller.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NavControllerComponent', () => {
  let component: NavControllerComponent;
  let fixture: ComponentFixture<NavControllerComponent>;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavControllerComponent],
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: Store,
          useValue: {
            select: jasmine.createSpy().and.returnValue(of('/flights')),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavControllerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have tabs data', () => {
    expect(component.tabs.length).toBe(4);
    expect(component.tabs[0].title).toBe('Flights');
    expect(component.tabs[1].title).toBe('Hotels');
    expect(component.tabs[2].title).toBe('Cars');
    expect(component.tabs[3].title).toBe('Activities');
  });

  it('should initialize selectedTabIndex$ correctly on ngOnInit', () => {
    component.ngOnInit();
    component.selectedTabIndex$.subscribe((tabIndex) => {
      expect(tabIndex).toBe(0);
    });
  });

  it('should navigate to correct route on tab change', () => {
    component.onTabChanged(1);
    expect(router.navigate).toHaveBeenCalledWith(['hotels']);
  });

  it('should set selectedTabIndex$ correctly for each path', () => {
    store.select = jasmine.createSpy().and.returnValue(of('/cars'));
    component.ngOnInit();
    component.selectedTabIndex$.subscribe((tabIndex) => {
      expect(tabIndex).toBe(2);
    });
  });

  it('should handle an invalid path correctly', () => {
    store.select = jasmine.createSpy().and.returnValue(of('/invalid'));
    component.ngOnInit();
    component.selectedTabIndex$.subscribe((tabIndex) => {
      expect(tabIndex).toBe(0);
    });
  });
});
