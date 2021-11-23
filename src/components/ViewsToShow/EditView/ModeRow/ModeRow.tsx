import { useContext } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DefaultModes } from 'sharedTypes';
import { FavMode } from 'sharedHelpers/cookies/types';
// Components
import StopDepartures from '../StopDepartures/StopDepartures';

// const data = {
//   bus: [
//     {
//       stopName: 'Birmingham, Old Repertory Theatre (Stop NS13)',
//       stopAtcoCode: '43000202603',
//       lines: [{ id: '11628', name: '80', routeName: 'Birmingham - West Bromwich via Smethwick' }],
//     },
//     {
//       stopName: 'Perry Common, Gipsy Lane (adj)',
//       stopAtcoCode: '43000515401',
//       lines: [{ id: '9217', name: '7', routeName: 'Perry Common - Birmingham via Witton' }],
//     },
//   ],
//   tram: [
//     {
//       stopName: 'Aston University, Price St (opp)',
//       stopAtcoCode: '43000252302',
//       lines: [
//         { id: '4738', name: '997', routeName: 'Walsall - Birmingham via Aldridge, Pheasey' },
//         { id: '10670', name: '33', routeName: 'Birmingham - Pheasey via Perry Barr' },
//         { id: '8739', name: '51', routeName: 'Birmingham - Walsall via Great Barr' },
//       ],
//     },
//     {
//       stopName: 'Kingstanding, Carshalton Rd (adj)',
//       stopAtcoCode: '43000524201',
//       lines: [
//         { id: '8856', name: '5', routeName: 'West Bromwich - Sutton Coldfield via New Oscott' },
//       ],
//     },
//   ],
//   train: [],
// };

// console.log(JSON.stringify(data));

const ModeRow = ({ stops, mode }: { stops: FavMode[]; mode: DefaultModes }): JSX.Element => {
  const [{ editMode, tempFavs }] = useContext(GlobalContext);
  return (
    <>
      {stops.length > 0 && (
        <>
          <div className="wmnds-live-departures-widget__tram">
            <div className="wmnds-h3 wmnds-m-t-md wmnds-m-b-md">{`${mode
              .charAt(0)
              .toUpperCase()}${mode.slice(1, mode.length)}`}</div>
            {stops.map(stop => (
              <StopDepartures
                mode={mode}
                stop={stop}
                key={`stopDepartures_${mode}_${stop.stopAtcoCode}`}
              />
            ))}
            {editMode && tempFavs[mode].length === 0 && `No favourite ${mode} services`}
          </div>
          <hr />
        </>
      )}
    </>
  );
};

export default ModeRow;
