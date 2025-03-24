import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HotelsHomeComponent } from './hotels-home/hotels-home.component';
import { SharedModule } from '../../shared/shared.module';
import { HotelsRoutingModule } from './hotels-routing.module';


@NgModule({
  declarations: [
    HotelsHomeComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    SharedModule,
    NgOptimizedImage,
  ]
})
export class HotelsModule { }
