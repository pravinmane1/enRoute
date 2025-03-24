import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-labelled-input-box',
  templateUrl: './labelled-input-box.component.html',
  styleUrl: './labelled-input-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelledInputBoxComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() inputType: string = 'text';
  @Input() prefix: string = '';
  @Input() readOnly: boolean = false;

  @Output() inputClick = new EventEmitter();
  @Output() outSideClick = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Output() inputTextChange = new EventEmitter();

  @ViewChild('inputBox') inputBox!: ElementRef;

  public outSideClickListener = () => {};

  constructor(private renderer: Renderer2) {}

  public onInputClick() {
    this.listenOutSideClick();
    this.inputClick.emit();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onInputTextChange(event: any) {
    this.inputTextChange.emit(event?.target?.value || '');
  }

  private listenOutSideClick() {
    this.outSideClickListener = this.renderer.listen(
      'window',
      'click',
      (e: Event) => {
        if (
          e.target !== this.inputBox?.nativeElement &&
          !this.inputBox?.nativeElement?.contains(e.target)
        ) {
          this.stopListeningClick();
          this.outSideClick.emit(e.target);
        }
      }
    );
  }

  private stopListeningClick() {
    this.outSideClickListener();
  }
}
