import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { Suggestion } from './suggestion.interface';

@Component({
  selector: 'app-suggestion-input',
  templateUrl: './suggestion-input.component.html',
  styleUrl: './suggestion-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionInputComponent<T> implements OnInit, OnDestroy {
  @Input() label!: string;
  @Input() suggestionOptions: Suggestion<T>[] = [];
  @Input() isSuggestionLoading: boolean = false;
  @Input() placeholder: string = '';
  @Input() dropdownIcon: string = '';
  @Input() errorMessage: string = '';
  @Input() set selectedValue(value: string) {
    if (value) {
      this.selectedSuggestionOption.displayValue = value;
    }
  }

  @Output() selectionChanged = new EventEmitter<Suggestion<T>>();
  @Output() searchTextChanged = new EventEmitter<string>();
  @Output() inputTouched = new EventEmitter();

  @ViewChild('suggestionBox') suggestionBox!: ElementRef;

  public searchKey = '';
  public isSuggestionBoxOpen = false;
  public selectedSuggestionOption: Suggestion<T> = {
    key: '',
    displayValue: '',
    data: {} as T,
  };
  public inputTextChange$: Subject<string> = new Subject();
  public destroySubject$ = new Subject<void>();
  private isSelectedTextDirty = false;

  constructor() {}
  ngOnDestroy(): void {
    this.destroySubject$.complete();
    this.destroySubject$.next();
  }

  ngOnInit(): void {
    this.inputTextChange$
      .pipe(takeUntil(this.destroySubject$), distinctUntilChanged())
      .subscribe((searchText) => {
        this.searchTextChanged.emit(searchText);
      });
  }

  public onInputClick() {
    this.inputTouched.emit();
    this.isSuggestionBoxOpen = true;
  }

  public onOutSideClick() {
    if (!this.isSuggestionBoxOpen) {
      return;
    }

    if (this.isSelectedTextDirty) {
      this.selectedSuggestionOption.displayValue = '';
      this.selectionChanged.emit({
        key: '',
        data: null as T,
        displayValue: '',
      });
    }
    this.isSuggestionBoxOpen = false;
  }

  public onInputTextChange(text: string) {
    this.isSelectedTextDirty = true;
    if (!text) {
      this.selectedSuggestionOption.displayValue = '';
    }
    this.inputTextChange$.next(text);
  }

  public onSuggestionClick(item: Suggestion<T>) {
    this.isSelectedTextDirty = false;
    this.selectedSuggestionOption = {
      ...item,
      displayValue: item.displayValue,
    };
    this.selectionChanged.emit({ ...this.selectedSuggestionOption });
  }
}
