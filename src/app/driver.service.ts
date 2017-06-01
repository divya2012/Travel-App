import { Injectable } from '@angular/core';

import { Driver, Trip } from './driver-detail/driver';
import { DRIVERS, TRIPS } from './mock-drivers';

@Injectable()
export class DriverService {
	getDrivers(): Promise<Driver[]> {
		return Promise.resolve(DRIVERS);
	}
	getDriver(id: number): Promise<Driver> {
		return this.getDrivers()
	       .then(drivers => drivers.find(driver => driver.id === id));
	}
	getTrips(): Promise<Trip[]> {
		return Promise.resolve(TRIPS);
	}
	getTrip(id: number): Promise<Trip> {
		return this.getTrips()
	       .then(trips => trips.find(trip => trip.id === id));
	}
}