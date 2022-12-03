import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAppointmentRoutingModule } from './create-appointment-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalMaterialModule } from 'src/app/shared/material.module';
import { CreateAppointmentComponent } from './create-appointment.component';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CreateAppointmentComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LocalMaterialModule,
    CreateAppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [
    AppointmentService
  ]

})
export class CreateAppointmentModule { }
