import { useContext } from 'preact/hooks';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
import { setCookie } from 'sharedHelpers/cookies/cookies';

type UseFooterCTAButtonsTypes = {
  disruptionsLink: string;
  editMode: boolean;
  handleEditServicesClick: () => void;
  handleCancelChanges: () => void;
  handleSaveChanges: () => void;
};

const useFooterCTAButtons = (): UseFooterCTAButtonsTypes => {
  const disruptionsLink = '//disruptions.tfwm.org.uk/?when=now&amp;isMapVisible=false';
  const [{ editMode, tempFavs }, dispatch] = useContext(GlobalContext);

  const handleEditServicesClick = () => dispatch({ type: 'SET_EDIT_MODE', payload: true });

  const handleCancelChanges = () => {
    dispatch({ type: 'SET_EDIT_MODE', payload: false });
  };

  const handleSaveChanges = () => {
    dispatch({ type: 'UPDATE_DATA', payload: tempFavs });
    const favStateString = JSON.stringify(tempFavs); // Stringify our cookieObj
    setCookie('favStopStation', favStateString, 181);
    dispatch({ type: 'SET_EDIT_MODE', payload: false });
  };

  return {
    disruptionsLink,
    editMode,
    handleEditServicesClick,
    handleCancelChanges,
    handleSaveChanges,
  };
};

export default useFooterCTAButtons;
