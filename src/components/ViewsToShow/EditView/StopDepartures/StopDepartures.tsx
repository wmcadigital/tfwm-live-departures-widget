import { useContext, useEffect, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
// Custom hooks
import useFetch from 'customHooks/useFetch';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { FavMode, FavLineEntity } from 'sharedHelpers/cookies/types';
import { DefaultModes } from 'sharedTypes';
import { BusDeparturesAPI, DeparturesEntity } from './types';
// Components
import StopEditMode from './StopEditMode';

const StopDepartures = ({
  stop,
  mode,
}: {
  stop: FavMode;
  mode: DefaultModes;
}): JSX.Element | null => {
  const [{ editMode }] = useContext(GlobalContext);

  const [stopFavs] = useState<FavLineEntity[]>(stop.lines);

  const [departures, setDepartures] = useState<DeparturesEntity[]>([]);
  const { response, isFetching, hasError } = useFetch<BusDeparturesAPI>(
    `/Stop/v2/Departures/${stop.stopAtcoCode}`
  );

  useEffect(() => {
    const lines = stopFavs.map(line => line.id);
    if (response && response?.departures) {
      const filteredDepartures = response?.departures.filter(departure =>
        lines.includes(departure.line.id)
      );
      setDepartures(filteredDepartures);
    }
  }, [stopFavs, response]);

  if (!stopFavs.length) return null;

  return (
    <>
      {!editMode ? (
        <>
          <div className="wmnds-m-b-md">
            <a href={`https://find-stop-or-station.tfwm.org.uk/stop/${stop.stopAtcoCode}`}>
              {stop.stopName}
            </a>
          </div>
          {stopFavs.map(line => (
            <>
              <div className="wmnds-live-departures__service-details wmnds-m-b-md">
                <div className="wmnds-live-departures__service-name">{line.name}</div>
                <div className="wmnds-live-departures__service-description">
                  <strong>{line.routeName}</strong>
                </div>
              </div>
              {isFetching ? (
                <div className="wmnds-grid wmnds-grid--spacing-2-md">
                  <div className="wmnds-col-auto wmnds-m-b-md">
                    <div
                      className="wmnds-loader wmnds-loader--small"
                      role="alert"
                      aria-live="assertive"
                      style={{ width: '20px', height: '20px', borderWidth: '2px' }}
                    >
                      <p className="wmnds-loader__content">Content is loading...</p>
                    </div>
                  </div>
                  <div className="wmnds-col-auto">Getting departure times</div>
                </div>
              ) : (
                <>
                  {!hasError ? (
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
                        : `—`}
                    </div>
                  ) : (
                    'Could not get departure times for this service'
                  )}
                </>
              )}
            </>
          ))}
        </>
      ) : (
        <StopEditMode mode={mode} stop={stop} />
      )}
    </>
  );
};

export default StopDepartures;
