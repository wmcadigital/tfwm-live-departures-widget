/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'preact/hooks';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Components
import { JSX } from 'preact/jsx-runtime';
import DefaultView from './DefaultView/DefaultView';

const ViewsToShow = (): JSX.Element | null => {
  const [state] = useContext(GlobalContext);

  if (!state.hasFavs) return null;

  return (
    <>
      <h2 className="wmnds-m-t-none">My live departures</h2>
      <DefaultView />
    </>
  );
};

export default ViewsToShow;
