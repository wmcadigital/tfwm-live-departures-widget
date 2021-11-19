import { useContext } from 'preact/hooks';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Components
import { JSX } from 'preact/jsx-runtime';
import DefaultView from './DefaultView/DefaultView';
import PersonalisedView from './EditView/EditView';

const ViewsToShow = (): JSX.Element => {
  const [state] = useContext(GlobalContext);

  return (
    <>
      <h2 className="wmnds-m-t-none">My live departures</h2>

      {state.hasFavs ? <DefaultView /> : <PersonalisedView />}
    </>
  );
};

export default ViewsToShow;
