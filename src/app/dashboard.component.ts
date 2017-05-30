import { Component, OnInit } from '@angular/core';

import { Driver } from './driver-detail/driver';
import { DriverService } from './driver.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  drivers: Driver[] = [];

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.driverService.getDrivers()
      .then(drivers => this.drivers = drivers.slice(1, 5));
  }
}
