import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {Route, RouterModule} from '@angular/router';

const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent
    }
];

@NgModule({
  declarations: [
      DashboardComponent
  ],
  imports: [
      RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
