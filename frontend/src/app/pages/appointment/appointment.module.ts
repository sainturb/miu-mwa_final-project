import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { LocalMaterialModule } from 'src/app/shared/material.module';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppointmentComponent,

  ],

  imports: [
    CommonModule,
    FlexLayoutModule,
    LocalMaterialModule,
    AppointmentRoutingModule,
    MatDialogModule

  ],
  providers: [
    AppointmentService,
  ]
})
export class AppointmentModule { }
