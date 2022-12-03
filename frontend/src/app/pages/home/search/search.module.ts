import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './search.component';
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LocalMaterialModule} from "../../../shared/material.module";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgModule} from "@angular/core";


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    LocalMaterialModule,
    NgxSliderModule,
    MatSlideToggleModule,
    SearchRoutingModule
  ],
  providers: [
  ]
})
export class SearchModule {
}
