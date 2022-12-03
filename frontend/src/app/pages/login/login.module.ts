import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LocalMaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LocalMaterialModule,
    LoginRoutingModule,
  ],
  providers: [
  ]
})
export class LoginModule { }
