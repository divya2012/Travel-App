import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DirectionsMapDirective } from './google-map.directive';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { DriversComponent } from './drivers.component';
import { DriverService } from './driver.service';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DriversComponent,
    DriverDetailComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdAi__g9ItDFPrFu3OSXfRjsd05_9wcjg',
      libraries: ["places"]
    })
  ],
  providers: [DriverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
