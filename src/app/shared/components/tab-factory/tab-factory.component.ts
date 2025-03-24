import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ITabData } from '../../../core/interfaces';

@Component({
  selector: 'app-tab-factory',
  templateUrl: './tab-factory.component.html',
  styleUrl: './tab-factory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabFactoryComponent {
  @Input() tabs: ITabData[] = [];
  @Input() selectedTabIndex: number = 0;
  @Output() tabChanged = new EventEmitter<number>();
  @ContentChild('tabContent') tabContentRef!: TemplateRef<ContentChild>;

  public getTabIcon(i: number) {
    return i === this.selectedTabIndex
      ? this.tabs[i].selectedIcon
      : this.tabs[i].unselectedIcon;
  }

  public onTabClick(i: number): void {
    this.tabChanged.emit(i);
  }
}
