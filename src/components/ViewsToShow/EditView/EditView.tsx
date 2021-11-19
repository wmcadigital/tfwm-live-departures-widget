/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX } from 'preact/jsx-runtime';
// Helpers
import { getFavouritesFromCookies } from 'sharedHelpers/cookies/cookies';
// Components
import PersonalisedCTAButtons from './PersonalisedCTAButtons/PersonalisedCTAButtons';
import BusRow from './BusRow/BusRow';
import TramRow from './TramRow/TramRow';
import TrainRow from './TrainRow/TrainRow';

const PersonalisedView = (): JSX.Element => (
  // const { bus, tram, train, roads } = getFavouritesFromCookies();

  // Check if we have any favs for each mode, if so then show the relevant row
  <>
    <BusRow />
    {/* {tram && tram?.length > 0 && <TramRow favs={tram} />}
      {train && train?.length > 0 && <TrainRow favs={train} />} */}

    <PersonalisedCTAButtons />
  </>
);
export default PersonalisedView;
