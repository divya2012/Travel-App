import { Injectable } from '@angular/core';

import { Driver } from './driver-detail/driver';
import { DRIVERS } from './mock-drivers';

@Injectable()
export class DriverService {
  getDrivers(): Promise<Driver[]> {
    return Promise.resolve(DRIVERS);
  }
}