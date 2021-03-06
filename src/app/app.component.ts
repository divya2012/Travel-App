import { Component, NgModule, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import {} from '@types/googlemaps';

import { DirectionsMapDirective } from './google-map.directive';

import { Driver } from './driver-detail/driver';
import { DriverService } from './driver.service';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DriverService, GoogleMapsAPIWrapper ]
})

export class AppComponent implements OnInit {
  
  title = 'Trip Details of Drivers';
  drivers : Driver[];
  selectedDriver: Driver;

  public latitude: number;
  public longitude: number;
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
  public zoom: number;
  public iconurl: string;
  public mapCustomStyles : any;
  public estimatedTime: any;
  public estimatedDistance: any;

  @ViewChild("pickupInput")
  public pickupInputElementRef: ElementRef;

  @ViewChild("pickupOutput")
  public pickupOutputElementRef: ElementRef;

  @ViewChild("scrollMe")
  private scrollContainer: ElementRef;

  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

  public origin :any ; // its a example aleatory position
  public destination : any; // its a example aleatory position

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef : ElementRef,
    private driverService: DriverService
  ) {}

	getDrivers(): void {
		this.driverService.getDrivers().then(drivers => this.drivers = drivers);
	}

  ngOnInit(): void {
    this.getDrivers();

    //set google maps defaults
    this.zoom = 10;
    this.latitude = 8.5241;
    this.longitude = 76.9366;
    this.iconurl = '../image/map-icon.png';

    // this.mapCustomStyles = this.getMapCusotmStyles();
    //create search FormControl
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();
    //set current position
    this.setCurrentPosition();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
        let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
          types: ["address"]
        });

        let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
          types: ["address"]
        });
      
        this.setupPlaceChangedListener(autocompleteInput, 'ORG');
        this.setupPlaceChangedListener(autocompleteOutput, 'DES');
    });
  }
    
  private setupPlaceChangedListener(autocomplete: any, mode: any ) {
    autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined) {
            return;
          }
          if (mode === 'ORG') {
              this.vc.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() }; 
              this.vc.originPlaceId = place.place_id;
          } else {
              this.vc.destination = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() }; // its a example aleatory position
              this.vc.destinationPlaceId = place.place_id;
          }

          if(this.vc.directionsDisplay === undefined){ 
              this.mapsAPILoader.load().then(() => { 
              this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
            }); 
          }
      
          //Update the directions
          this.vc.updateDirections();
          this.zoom = 12;
        });

    });
  }

  getDistanceAndDuration(){
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;
  }

  private setPickUpLocation( place:any ) {
    //verify result
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    //set latitude, longitude and zoom
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.zoom = 12;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private getMapCusotmStyles() {
    // Write your Google Map Custom Style Code Here.
  }

	onSelect(driver: Driver): void {
		this.selectedDriver = driver;
	}
}
