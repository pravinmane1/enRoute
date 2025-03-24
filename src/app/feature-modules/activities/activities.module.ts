import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesHomeComponent } from './components/activities-home/activities-home.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ActivitiesHomeComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    SharedModule,
    NgOptimizedImage
  ]
})
export class ActivitiesModule { }
