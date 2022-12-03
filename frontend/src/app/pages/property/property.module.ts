import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyComponent } from './property.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LocalMaterialModule} from "../../shared/material.module";
import {FlexModule} from "@angular/flex-layout";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    PropertyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LocalMaterialModule,
    PropertyRoutingModule,
    FlexModule,
    MatSlideToggleModule
  ],
  providers: [
  ]
})
export class PropertyModule { }
