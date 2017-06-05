import { Driver, Trip } from './driver-detail/driver';

export const DRIVERS: Driver[] = [
	{ id: 1, name: 'Rahul', place: 'TVM' },
	{ id: 2, name: 'Nikhil', place: 'TVM' },
	{ id: 3, name: 'Hari', place: 'TVM' },
	{ id: 4, name: 'Krishnan', place: 'TVM' },
	{ id: 5, name: 'Kannan', place: 'TVM' }
];

export const TRIPS: Trip[] = [
	{ id: 1, driver: 1, src: 'Trivandrum', dest: 'Kazakootam' },
	{ id: 2, driver: 2, src: 'kaniyapuram', dest: 'Kazakootam' },
	{ id: 3, driver: 3, src: 'ulloor', dest: 'Kazakootam' },
	{ id: 4, driver: 4, src: 'kesavadasapuram', dest: 'Kazakootam' },
	{ id: 5, driver: 5, src: 'thampanoor', dest: 'Kazakootam' },
	{ id: 6, driver: 1, src: 'attingal', dest: 'Thampanoor' },
	{ id: 7, driver: 3, src: 'petta', dest: 'ulloor' },
	{ id: 8, driver: 2, src: 'kesavadasapuram', dest: 'Kazakootam' },
	{ id: 9, driver: 3, src: 'kallampally', dest: 'thampanoor' }
]