import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAppLoading } from './store/shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'cxLoyalty';
  public isAppLoading$!: Observable<boolean>;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.isAppLoading$ = this.store.select(selectIsAppLoading);
  }
}
