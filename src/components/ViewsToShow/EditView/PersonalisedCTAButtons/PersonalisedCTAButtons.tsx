// Components
import Icon from 'components/shared/Icon/Icon';
import Link from 'components/shared/Link/Link';
import { JSX } from 'preact/jsx-runtime';
// CustomHooks
import usePersonalisedCTAButtons from './usePersonalisedCTAButtons';

const PersonalisedCTAButtons = (): JSX.Element => {
  const {
    disruptionsLink,
    editMode,
    handleEditServicesClick,
    handleSaveChanges,
    handleCancelChanges,
  } = usePersonalisedCTAButtons();

  return (
    <div className="wmnds-grid wmnds-grid--spacing-2-lg">
      {/* Add services button */}
      <div className="wmnds-col-1-2">
        {!editMode ? (
          <button
            className="wmnds-btn wmnds-btn--mode wmnds-col-1"
            type="button"
            data-btn-name="edit-services"
            onClick={handleEditServicesClick}
          >
            Remove services {editMode}
          </button>
        ) : (
          <button
            type="button"
            className="wmnds-btn wmnds-btn--mode wmnds-col-1 wmnds-m-b-md"
            onClick={handleCancelChanges}
          >
            Cancel
          </button>
        )}
      </div>
      {/* View all updates button */}
      <div className="wmnds-col-1-2">
        {!editMode ? (
          <Link className="wmnds-btn wmnds-col-1" href={disruptionsLink} isButton>
            Find stop or station
            <Icon
              className="wmnds-btn__icon wmnds-btn__icon--right"
              iconName="general-chevron-right"
            />
          </Link>
        ) : (
          <button type="button" className="wmnds-btn wmnds-col-1" onClick={handleSaveChanges}>
            Save changes
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalisedCTAButtons;
