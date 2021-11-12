import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StateReportComponent } from './state-report/state-report.component';
import { HomeComponent} from './home/home.component';

const routes: Routes = [
  { path : '', component:HomeComponent},
  { path: 'home',component:HomeComponent},
  { path: 'state/report',component:StateReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
