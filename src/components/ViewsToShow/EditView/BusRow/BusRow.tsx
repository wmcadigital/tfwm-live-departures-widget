/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
// Custom hooks
import useFetch from 'customHooks/useFetch';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { BusDepartureTypes } from 'sharedTypes';
import { getFavsFromCookies } from 'sharedHelpers/cookies/cookies';
import { FavMode } from 'sharedHelpers/cookies/types';
import { BusDeparturesAPI, DeparturesEntity } from './types';

console.log(getFavsFromCookies('bus'));

const selectedStops = getFavsFromCookies('bus');
// [
//   {
//     stopName: 'Aston, Industrial Estate (adj)',
//     stopAtcoCode: '43000253701',
//     lines: [
//       { id: '12633', name: '65', routeName: 'Birmingham - Perry Common via Short Heath' },
//       { id: '12661', name: '67', routeName: 'Birmingham - Castle Vale via Tyburn Rd' },
//     ],
//   },
//   {
//     stopName: 'Stechford, Church Rd (before)',
//     stopAtcoCode: '43000456401',
//     lines: [
//       { id: '4735', name: '97', routeName: 'Birmingham - Chelmsley Wood via Heartlands Hosp' },
//     ],
//   },
// ];

const BusStopDepartures = ({ stop }: { stop: FavMode }) => {
  const [, dispatch] = useContext(GlobalContext);
  const [departures, setDepartures] = useState<DeparturesEntity[]>([]);
  const { response, isFetching, hasError } = useFetch<BusDeparturesAPI>(
    `/Stop/v2/Departures/${stop.stopAtcoCode}`
  );

  useEffect(() => {
    const lines = stop.lines.map(line => line.id);
    if (response && response?.departures) {
      const filteredDepartures = response?.departures.filter(departure =>
        lines.includes(departure.line.id)
      );
      setDepartures(filteredDepartures);
    }
  }, [stop, response]);

  return (
    <>
      <div className="wmnds-m-b-md">
        <a href={`https://find-stop-or-station.tfwm.org.uk/stop/${stop.stopAtcoCode}`}>
          {stop.stopName}
        </a>
      </div>
      {isFetching ? (
        <div className="wmnds-col-auto">
          <div className="wmnds-loader wmnds-loader--small" role="alert" aria-live="assertive">
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
        </div>
      ) : (
        stop.lines.map(line => (
          <>
            <div className="wmnds-live-departures__service-details wmnds-m-b-md">
              <div className="wmnds-live-departures__service-name">{line.name}</div>
              <div className="wmnds-live-departures__service-description">
                <strong>{line.routeName}</strong>
              </div>
            </div>
            <div className="wmnds-live-departures__times wmnds-m-b-md">
              {departures.filter(departure => departure.line.id === line.id).length > 0
                ? departures.slice(0, 4).map(({ timeToArrival }) => (
                    <div
                      key={`live_dep_widg_${timeToArrival}`}
                      className="wmnds-live-departures__time"
                    >
                      {Math.ceil(timeToArrival / 60)} min
                      {Math.ceil(timeToArrival / 60) > 1 && 's'}
                    </div>
                  ))
                : `No departures`}
            </div>
          </>
        ))
      )}
    </>
  );
};

const BusRow = (): JSX.Element => (
  <>
    <div className="wmnds-live-departures-widget__bus">
      <div className="wmnds-h3 wmnds-m-t-md wmnds-m-b-md">Bus</div>
      {selectedStops.map(stop => (
        <BusStopDepartures stop={stop} key={`stopDepartures_${stop.stopAtcoCode}`} />
      ))}
    </div>
    <hr />
  </>
);

export default BusRow;
