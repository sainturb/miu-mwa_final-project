import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { AppointmentComponent } from './appointment.component';

const routes: Routes = [{
  path: '',
  component: AppointmentComponent,
},
{
  path: 'create',
  //component: CreateAppointmentComponent
  loadChildren: () => import('../create-appointment/create-appointment.module').then(m => m.CreateAppointmentModule),
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
