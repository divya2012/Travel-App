import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DirectionsMapDirective } from './google-map.directive';

import { AppComponent } from './app.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    DriverDetailComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdAi__g9ItDFPrFu3OSXfRjsd05_9wcjg',
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
