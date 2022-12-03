import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { LocalMaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {NgToastModule} from "ng-angular-popup";



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    LocalMaterialModule,
    RegisterRoutingModule,
    NgToastModule
  ]
})
export class RegisterModule { }
