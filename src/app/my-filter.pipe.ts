import {Pipe, PipeTransform} from '@angular/core';

import { Trip } from './driver-detail/driver';

@Pipe({
    name: 'myfilter'
})

export class MyFilterPipe implements PipeTransform {
  transform(allTrips: Trip[], value: any) {
    return allTrips.filter(trip => trip.driver === value);
  }
}