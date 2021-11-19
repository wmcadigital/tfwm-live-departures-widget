// Types
import { TransformedModes } from 'sharedTypes';
import { DefaultModes } from './modes';

export type DisruptionSeverity = 'none' | 'normal' | 'high' | 'veryHigh' | undefined;

export type DepartureTypes = {
  id: string;
  disruptionSeverity: DisruptionSeverity;
  disruptionUrlSearchParams?: string;
  formatDisruptionIndicatorText?: boolean;
  serviceName: string;
  optionalText?: string;
  modalIcon: TransformedModes;
  mode: DefaultModes;
};

export type BusDepartureTypes = {
  stopAtcoCode: string;
  stopName: string;
  lines: {
    id: string;
    routeName: string;
    departures: number[];
  }[];
  mode: DefaultModes;
};

export type BusStopPointTypes = {
  atcoCode: string;
  stopName: string;
  mode: DefaultModes;
};
