import { Component, Input } from '@angular/core';

import { Driver } from './driver';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})

export class DriverDetailComponent {
  @Input() driver: Driver;
}
