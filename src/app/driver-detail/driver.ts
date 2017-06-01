export class Driver {
  id: number;
  name: string;
  place: string;
  src: string;
  dest: string;
}

export class Trip {
  id: number;
  driver: number;
  src: string;
  dest: string;
}