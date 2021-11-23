import { DefaultModes, DepartureTypes } from 'sharedTypes';
import { FavMode } from 'sharedHelpers/cookies/types';

type FavsStateProps = {
  bus: DepartureTypes[];
  tram: DepartureTypes[];
  train: DepartureTypes[];
};

type FavProps = {
  bus: FavMode[];
  tram: FavMode[];
  train: FavMode[];
};

export type InitialStateProps = {
  editMode: boolean;
  isRowExpandedOnMobile: {
    bus: boolean;
    tram: boolean;
    train: boolean;
  };
  hasFavs: boolean;
  favs: FavsStateProps;
  previousFavs: FavsStateProps;
  favsToRemoveOnSave: { mode: DefaultModes; id: string }[];
  favourites: FavProps;
  tempFavs: FavProps;
};

export type ActionType =
  | {
      type: 'SET_EDIT_MODE';
      payload: boolean;
    }
  | {
      type: 'TOGGLE_ROW_VISIBILITY';
      payload: { mode: DefaultModes; visible: boolean };
    }
  | {
      type: 'UPDATE_BUS_SERVICES';
      payload: {
        mode: DefaultModes;
        data: DepartureTypes[];
      };
    }
  | {
      type: 'UPDATE_DATA';
      payload: FavProps;
    }
  | {
      type: 'UPDATE_TEMP_DATA';
      payload: {
        mode: DefaultModes;
        data: FavMode;
      };
    }
  | {
      type: 'UPDATE_SERVICES';
      payload: {
        mode: DefaultModes;
        data: DepartureTypes[];
      };
    }
  | {
      type: 'REMOVE_SERVICE';
      payload: {
        mode: DefaultModes;
        id: string;
      };
    }
  | {
      type: 'CANCEL_STATE';
      payload: FavsStateProps;
    }
  | {
      type: 'SAVE_NEW_STATE';
    };
