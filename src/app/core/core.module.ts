import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponent } from './components/loader/loader.component';
import { NavControllerComponent } from './components/nav-controller/nav-controller.component';

@NgModule({
  declarations: [NavControllerComponent, LoaderComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [NavControllerComponent, LoaderComponent],
})
export class CoreModule {}
