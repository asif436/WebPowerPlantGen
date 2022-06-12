import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { SharedService } from './_services/shared.service';
import { WINDOW_PROVIDERS } from './_services/window.providers';
import { NgxSpinnerModule } from "ngx-spinner";
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgChartsModule,
    NgxSpinnerModule,
    GoogleMapsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [SharedService, WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
