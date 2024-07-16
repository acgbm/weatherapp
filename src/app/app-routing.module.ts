import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';

const routes: Routes = [
  {path: '', redirectTo: 'weather', pathMatch: 'full' },
  {path: 'weather', component: ForecastComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
