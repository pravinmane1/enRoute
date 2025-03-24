import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsHomeComponent } from './hotels-home/hotels-home.component';
import { SharedModule } from '../../shared/shared.module';


const routes: Routes = [{ path: '', component: HotelsHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
