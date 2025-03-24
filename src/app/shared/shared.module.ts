import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarDatePickerComponent } from './components/calendar-date-picker/calendar-date-picker.component';
import { CounterComponent } from './components/counter/counter.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { LabelledInputBoxComponent } from './components/labelled-input-box/labelled-input-box.component';
import { ShimmerLoaderComponent } from './components/shimmer-loader/shimmer-loader.component';
import { SuggestionInputComponent } from './components/suggestion-input/suggestion-input.component';
import { TabFactoryComponent } from './components/tab-factory/tab-factory.component';

@NgModule({
  declarations: [
    TabFactoryComponent,
    SuggestionInputComponent,
    LabelledInputBoxComponent,
    DateRangePickerComponent,
    CalendarDatePickerComponent,
    ShimmerLoaderComponent,
    CounterComponent,
  ],
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  exports: [
    TabFactoryComponent,
    SuggestionInputComponent,
    DateRangePickerComponent,
    ShimmerLoaderComponent,
    LabelledInputBoxComponent,
    CounterComponent,
    ShimmerLoaderComponent,
  ],
})
export class SharedModule {}
