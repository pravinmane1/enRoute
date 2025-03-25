import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabFactoryComponent } from './tab-factory.component';
import { ITabData } from '../../../core/interfaces';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

describe('TabFactoryComponent', () => {
  let component: TabFactoryComponent;
  let fixture: ComponentFixture<TabFactoryComponent>;
  let tabData: ITabData[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabFactoryComponent],
      imports: [NgOptimizedImage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabFactoryComponent);
    component = fixture.componentInstance;

    tabData = [
      {
        title: 'Flights',
        selectedIcon: 'assets/module-nav-tab-icons/plane-s.svg',
        unselectedIcon: 'assets/module-nav-tab-icons/plane.svg',
      },
      {
        title: 'Hotels',
        selectedIcon: 'assets/module-nav-tab-icons/hotel-s.svg',
        unselectedIcon: 'assets/module-nav-tab-icons/hotel.svg',
      },
      {
        title: 'Cars',
        selectedIcon: 'assets/module-nav-tab-icons/car-s.svg',
        unselectedIcon: 'assets/module-nav-tab-icons/car.svg',
      },
      {
        title: 'Activities',
        selectedIcon: 'assets/module-nav-tab-icons/flag-s.svg',
        unselectedIcon: 'assets/module-nav-tab-icons/flag.svg',
      },
    ];

    component.tabs = tabData;
    component.selectedTabIndex = 0;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct icon for the selected tab', () => {
    const icon = component.getTabIcon(0);
    expect(icon).toBe('assets/module-nav-tab-icons/plane-s.svg');
  });

  it('should display the correct icon for an unselected tab', () => {
    const icon = component.getTabIcon(1);
    expect(icon).toBe('assets/module-nav-tab-icons/hotel.svg');
  });

  it('should emit tabChanged event with the correct index when a tab is clicked', () => {
    spyOn(component.tabChanged, 'emit');

    const tabIndex = 1;
    component.onTabClick(tabIndex);

    expect(component.tabChanged.emit).toHaveBeenCalledWith(tabIndex);
  });

  it('should have the correct initial selected tab index', () => {
    expect(component.selectedTabIndex).toBe(0);
  });

  it('should correctly switch the selected tab index', () => {
    spyOn(component.tabChanged, 'emit');
    const tabIndex = 1;
    component.onTabClick(tabIndex);

    expect(component.tabChanged.emit).toHaveBeenCalledWith(tabIndex);
  });

  it('should render the correct number of tabs', () => {
    const tabElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.tab-title')
    );
    expect(tabElements.length).toBe(4);
  });

  it('should display the correct title for each tab', () => {
    const tabElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('.tab-title')
    );
    expect(tabElements[0].nativeElement.textContent).toContain('Flights');
    expect(tabElements[1].nativeElement.textContent).toContain('Hotels');
    expect(tabElements[2].nativeElement.textContent).toContain('Cars');
    expect(tabElements[3].nativeElement.textContent).toContain('Activities');
  });
});
