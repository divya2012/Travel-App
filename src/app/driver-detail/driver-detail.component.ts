import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Driver } from './driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})

export class DriverDetailComponent implements OnInit {
	driver: Driver;

	constructor(
		private driverService: DriverService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	goBack(): void {
		this.location.back();
	}

	ngOnInit(): void {
	  this.route.params
	    .switchMap((params: Params) => this.driverService.getDriver(+params['id']))
	    .subscribe(driver => this.driver = driver);
	}
}
