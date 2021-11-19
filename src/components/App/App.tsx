// Components
import ViewsToShow from 'components/ViewsToShow/ViewsToShow';
// Context Wrapper
import { GlobalContextProvider } from 'globalState/GlobalStateContext';
import { JSX } from 'preact/jsx-runtime';

const App = (): JSX.Element => (
  <GlobalContextProvider>
    <div className="wmnds-live-departures wmnds-live-departures--widget wmnds-p-md wmnds-bg-white">
      <ViewsToShow />
    </div>
  </GlobalContextProvider>
);

export default App;
