import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { selectRouterUrl } from '../../../store/router/router.selectors';
import { ITabData } from '../../interfaces';

@Component({
  selector: 'app-nav-controller',
  templateUrl: './nav-controller.component.html',
  styleUrl: './nav-controller.component.scss',
})
export class NavControllerComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  public tabs: ITabData[] = [
    {
      title: $localize`Flights`,
      selectedIcon: 'assets/module-nav-tab-icons/plane-s.svg',
      unselectedIcon: 'assets/module-nav-tab-icons/plane.svg',
    },
    {
      title: $localize`Hotels`,
      selectedIcon: 'assets/module-nav-tab-icons/hotel-s.svg',
      unselectedIcon: 'assets/module-nav-tab-icons/hotel.svg',
    },
    {
      title: $localize`Cars`,
      selectedIcon: 'assets/module-nav-tab-icons/car-s.svg',
      unselectedIcon: 'assets/module-nav-tab-icons/car.svg',
    },
    {
      title: $localize`Adventures`,
      selectedIcon: 'assets/module-nav-tab-icons/flag-s.svg',
      unselectedIcon: 'assets/module-nav-tab-icons/flag.svg',
    },
  ];

  private tabsNavigationMapping = [
    { path: 'flights', tabIndex: 0 },
    { path: 'hotels', tabIndex: 1 },
    { path: 'cars', tabIndex: 2 },
    { path: 'adventures', tabIndex: 3 },
  ];

  public selectedTabIndex$!: Observable<number>;

  public onTabChanged(i: number) {
    const route = this.tabsNavigationMapping.find(
      (mapping) => mapping.tabIndex === i,
    )?.path;
    this.router.navigate([route]);
  }

  ngOnInit(): void {
    this.selectedTabIndex$ = this.store.select(selectRouterUrl).pipe(
      filter((url) => !!url?.split('/')?.[1]),
      map((url) => {
        const tabIndex = this.tabsNavigationMapping.find(
          (mapping) => mapping.path === url?.split('/')?.[1],
        )?.tabIndex;
        return tabIndex || 0;
      }),
    );
  }
}
