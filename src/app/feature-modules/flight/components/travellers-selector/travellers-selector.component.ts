import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-travellers-selector',
  templateUrl: './travellers-selector.component.html',
  styleUrl: './travellers-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravellersSelectorComponent implements OnDestroy, OnChanges {
  public travellersDisplay: string = '';
  public isPopoverOpen$: Subject<boolean> = new Subject();
  public controls = {
    travellers: {
      label: $localize`Travellers`,
      placeholder: $localize`Adults/Children`,
    },
    doneBtn: { value: $localize`DONE` },
  };
  @Input() public adultsCount: number = 0;
  @Input() public childrenCount: number = 0;
  @Input() public errorMessage: string = '';
  public outSideClickListener = () => {};

  @Output() selectionChanged = new EventEmitter<{
    adultsCount: number;
    childrenCount: number;
  }>();
  @Output() inputTouched = new EventEmitter();
  @ViewChild('popup') popup!: ElementRef;

  constructor(private renderer: Renderer2) {}
  ngOnChanges(): void {
    this.travellersDisplay = this.getTravellersDisplay();
  }

  ngOnDestroy(): void {
    this.stopListeningClick();
  }

  public onInputClicked() {
    this.isPopoverOpen$.next(true);
    setTimeout(() => {
      this.listenOutSideClick();
    });
  }
  public onCloseClick() {
    this.inputTouched.emit();
    this.stopListeningClick();
    this.isPopoverOpen$.next(false);
  }

  public onSubmit() {
    this.travellersDisplay = this.getTravellersDisplay();
    this.selectionChanged.emit({
      adultsCount: this.adultsCount,
      childrenCount: this.childrenCount,
    });

    this.onCloseClick();
  }
  public onAdultsCountChange(count: number) {
    this.adultsCount = count;
  }
  public onChildrenCountChange(count: number) {
    this.childrenCount = count;
  }

  public get isSubmitDisabled(): boolean {
    return this.adultsCount === 0;
  }

  private getTravellersDisplay(): string {
    const adultsSegment =
      this.adultsCount > 0
        ? this.adultsCount > 1
          ? `${this.adultsCount} ` + $localize`Adults`
          : `${this.adultsCount} ` + $localize`Adult`
        : '';

    const childrenSegment =
      this.childrenCount > 0
        ? this.childrenCount > 1
          ? `${this.childrenCount} ` + $localize`Children`
          : `${this.childrenCount} ` + $localize`Child`
        : '';

    return childrenSegment
      ? adultsSegment + ', ' + childrenSegment
      : adultsSegment;
  }

  private listenOutSideClick() {
    this.outSideClickListener = this.renderer.listen(
      'window',
      'click',
      (e: Event) => {
        if (
          e.target !== this.popup?.nativeElement &&
          !this.popup?.nativeElement?.contains(e.target)
        ) {
          this.onCloseClick();
        }
      },
    );
  }
  private stopListeningClick() {
    this.outSideClickListener();
  }
}
