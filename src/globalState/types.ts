import { DefaultModes } from 'sharedTypes';
import { FavMode } from 'sharedHelpers/cookies/types';

type FavProps = {
  bus: FavMode[];
  tram: FavMode[];
  train: FavMode[];
};

export type InitialStateProps = {
  editMode: boolean;
  hasFavs: boolean;
  favourites: FavProps;
  tempFavs: FavProps;
};

export type ActionType =
  | {
      type: 'SET_EDIT_MODE';
      payload: boolean;
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
    };
