/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Helpers
import { getFavsFromCookies } from 'sharedHelpers/cookies/cookies';
// Components
import PersonalisedCTAButtons from './PersonalisedCTAButtons/PersonalisedCTAButtons';
import ModeRow from './ModeRow/ModeRow';

const PersonalisedView = (): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const [{ favourites }, dispatch] = useContext(GlobalContext);
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      const { bus, tram, train } = getFavsFromCookies();
      dispatch({
        type: 'UPDATE_DATA',
        payload: {
          bus: bus || [],
          train: train || [],
          tram: tram || [],
        },
      });
    }
  }, [mounted, favourites, dispatch]);
  return (
    // Check if we have any favs for each mode, if so then show the relevant row
    <>
      {favourites.bus && favourites.bus?.length > 0 && (
        <ModeRow stops={favourites.bus} mode="bus" />
      )}
      {favourites.train && favourites.train?.length > 0 && (
        <ModeRow stops={favourites.train} mode="train" />
      )}
      {favourites.tram && favourites.tram?.length > 0 && (
        <ModeRow stops={favourites.tram} mode="tram" />
      )}
      <PersonalisedCTAButtons />
    </>
  );
};
export default PersonalisedView;
