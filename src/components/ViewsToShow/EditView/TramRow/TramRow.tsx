import { useContext, useEffect } from 'preact/hooks';
// Components
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
// Custom hooks
import useFetch from 'customHooks/useFetch';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DepartureTypes } from 'sharedTypes';
import { TramStopsAPI, TramRowProps } from './types';

const TramRow = ({ favs }: TramRowProps): JSX.Element => {
  const [, dispatch] = useContext(GlobalContext);
  const { response, isFetching, hasError } = useFetch<TramStopsAPI>(`/metro/v2/stop/${favs}`);

  useEffect(() => {
    if (response && response.metroStopsById) {
      const data = response?.metroStopsById.map(
        ({ atcoCode: id, disruptionSeverity, name }): DepartureTypes => ({
          id,
          disruptionSeverity,
          disruptionUrlSearchParams: `?mode=tram&query=${name}&queryTo=${name}&selectedItem=${id}&selectedItemTo=${id}`,
          formatDisruptionIndicatorText: false,
          serviceName: 'MM1',
          optionalText: name,
          modalIcon: 'metro',
          mode: 'tram',
        })
      );

      dispatch({
        type: 'UPDATE_SERVICES',
        payload: {
          mode: 'tram',
          data,
        },
      });
    }
  }, [dispatch, response]);

  return (
    <DisruptionRowContainer
      mode="tram"
      isFetching={isFetching}
      hasError={hasError || !response?.metroStopsById}
    />
  );
};

export default TramRow;
