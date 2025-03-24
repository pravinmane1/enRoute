import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsHomeComponent } from './components/cars-home/cars-home.component';

const routes: Routes = [{ path: '', component: CarsHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsRoutingModule {}
