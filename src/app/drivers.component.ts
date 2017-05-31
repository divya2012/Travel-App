import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Driver } from './driver-detail/driver';
import { DriverService } from './driver.service';

@Component({
  selector: 'my-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})

export class DriversComponent implements OnInit {
  drivers : Driver[];
  selectedDriver: Driver;

  constructor(
    private router: Router,
    private driverService: DriverService,
  ) {}

	getDrivers(): void {
		this.driverService.getDrivers().then(drivers => this.drivers = drivers);
	}

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedDriver.id]);
  }

  onSelect(driver: Driver): void {
    this.selectedDriver = driver;
  }

  ngOnInit(): void {
    this.getDrivers();
  }
}
