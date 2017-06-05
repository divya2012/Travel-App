import { Component, NgModule, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import {} from '@types/googlemaps';
import { Headers, Http } from '@angular/http';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { DirectionsMapDirective } from '../google-map.directive';
import { Router } from '@angular/router';

import { Driver, Trip } from './driver';
import { DriverService } from '../driver.service';
import { MyFilterPipe } from '../my-filter.pipe';

declare var google: any;

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css'],
  providers: [ GoogleMapsAPIWrapper ]
})

export class DriverDetailComponent implements OnInit {
	driver: Driver;
	trips: Trip[];
	trip: Trip;
	selectedTrip: Trip;
	filterargs = {id: '1'};

	/* Google Map */
	public latitude: number;
	public longitude: number;
	public zoom: number;
	public iconurl: string;
	public mapCustomStyles : any;
	public estimatedTime: any;
	public estimatedDistance: any;

	@ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

	constructor(
		private mapsAPILoader: MapsAPILoader,
	    private ngZone: NgZone,
	    private gmapsApi: GoogleMapsAPIWrapper,
	    private router: Router,
	    private http: Http,
		private driverService: DriverService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	goBack(): void {
		this.location.back();
	}

	getTrips(): void {
		this.driverService.getTrips().then(trips => this.trips = trips);
	}

	onSelectTrip(Trip: Trip): void {
	    this.selectedTrip = Trip;
	    setTimeout(() => { 
	    	this.vc.origin = this.selectedTrip.src;
		    this.vc.destination = this.selectedTrip.dest;
		    if(this.vc.directionsDisplay === undefined){ 
		        this.mapsAPILoader.load().then(() => { 
		        this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
		      }); 
		    }

		    //Update the directions
		    this.vc.updateDirections();
		    this.zoom = 12;
	    }, 100);
	}

	ngOnInit(): void {
		this.getTrips();
	   //set google maps defaults
	    this.zoom = 10;
	    this.latitude = 8.5241;
	    this.longitude = 76.9366;
	    this.iconurl = '../image/map-icon.png';

	    //set current position
	    this.setCurrentPosition();
	    
	    this.route.params
	    .switchMap((params: Params) => this.driverService.getDriver(+params['id']))
	    .subscribe(driver => {
	    	this.driver = driver;
	    });
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
}
