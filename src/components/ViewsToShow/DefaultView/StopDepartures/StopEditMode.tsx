import { useContext, useEffect, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Components
import Icon from 'components/shared/Icon/Icon';
// Types
import { FavMode, FavLineEntity } from 'sharedHelpers/cookies/types';
import { DefaultModes } from 'sharedTypes';

const StopEditMode = ({ stop, mode }: { stop: FavMode; mode: DefaultModes }): JSX.Element => {
  const [{ editMode, tempFavs }, dispatch] = useContext(GlobalContext);
  const [tempStop] = useState<FavMode>(stop);
  const [tempStopFavs, setTempStopFavs] = useState<FavLineEntity[]>(stop.lines);
  const tempFavStops = tempFavs[mode].find(s => s.stopAtcoCode === stop.stopAtcoCode);

  const removeLine = (lineId: string) => {
    setTempStopFavs(tempStopFavs.filter(fav => fav.id !== lineId));
  };

  useEffect(() => {
    const stopData = {
      ...tempStop,
    };
    dispatch({ type: 'UPDATE_TEMP_DATA', payload: { mode, data: stopData } });
  }, [dispatch, tempStop, mode, editMode]);

  useEffect(() => {
    const stopData = {
      ...tempStop,
      lines: tempStopFavs,
    };
    dispatch({ type: 'UPDATE_TEMP_DATA', payload: { mode, data: stopData } });
  }, [tempStop, dispatch, mode, tempStopFavs]);

  return (
    <>
      {tempFavStops?.lines?.length && (
        <>
          <div className="wmnds-m-b-md">
            <a href={`https://find-stop-or-station.tfwm.org.uk/stop/${stop.stopAtcoCode}`}>
              {stop.stopName}
            </a>
          </div>
          {tempFavStops.lines.map(line => (
            <div className="wmnds-live-departures__service-details wmnds-m-b-md" key={line.id}>
              <div className="wmnds-live-departures__service-name">{line.name}</div>
              <div className="wmnds-live-departures__service-description">
                <strong>{line.routeName}</strong>
              </div>
              <div className="wmnds-live-departures__service-remove">
                <button
                  className="wmnds-btn wmnds-btn--destructive"
                  title="Remove service"
                  type="button"
                  onClick={() => removeLine(line.id)}
                >
                  <Icon
                    title="Remove service"
                    iconName="general-trash"
                    className="wmnds-btn__icon"
                  />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default StopEditMode;
