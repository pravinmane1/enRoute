import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsHomeComponent } from './components/cars-home/cars-home.component';


@NgModule({
  declarations: [
    CarsHomeComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    NgOptimizedImage,
  ]
})
export class CarsModule { }
