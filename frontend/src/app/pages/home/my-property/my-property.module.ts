import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPropertyRoutingModule } from './my-property-routing.module';
import { MyPropertyComponent } from './my-property.component';
import {LocalMaterialModule} from "../../../shared/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditComponent } from './edit/edit.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    MyPropertyComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    LocalMaterialModule,
    FlexLayoutModule,
    MyPropertyRoutingModule,
    MatSlideToggleModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MyPropertyModule { }
