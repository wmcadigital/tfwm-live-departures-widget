import { DisruptionSeverity } from 'sharedTypes/serviceDepartures';

export interface BusFav {
  stopName: string;
  stopAtcoCode: string;
  lines: BusFavLine[];
}

export interface BusFavLine {
  id: string;
  name: string;
  routeName: string;
}

export type BusRowProps = {
  favs: BusFav[];
};

export interface BusServicesAPI {
  disruptionTimeWindow: DisruptionTimeWindow;
  services?: ServicesEntity[] | null;
  url: string;
  versionNo: string;
  staleAt: string;
}
export interface DisruptionTimeWindow {
  start: string;
  end: string;
}
export interface ServicesEntity {
  id: string;
  mode: string;
  serviceNumber: string;
  hasDisruptions: boolean;
  disruptionSeverity: DisruptionSeverity;
  routes?: RoutesEntity[] | null;
}
export interface RoutesEntity {
  direction: string;
  routeName: string;
  operatorCode: string;
  hasDisruption: boolean;
  disruptionSeverity: string;
}

export interface BusDeparturesAPI {
  url: string;
  versionNo: string;
  staleAt: string;
  departures?: DeparturesEntity[] | null;
}
export interface DeparturesEntity {
  id: string;
  order: number;
  vehicleId: string;
  scheduledArrival: string;
  expectedArrival: string;
  timeToArrival: number;
  stopSequence: number;
  towards: string;
  destinationStopPoint: DestinationStopPoint;
  line: Line;
}
export interface DestinationStopPoint {
  url: string;
  atcoCode: string;
  commonName: string;
}
export interface Line {
  id: string;
  name: string;
  operator: string;
  mode: string;
}
