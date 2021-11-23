import { createContext, JSX } from 'preact';
import { useReducer } from 'preact/hooks';
// Helpers
import { hasAnyFavourites } from 'sharedHelpers';
// Types
import { ContextProviderProps, CreateContextProps } from 'sharedTypes';
import { ActionType, InitialStateProps } from './types';

const initialState: InitialStateProps = {
  editMode: false,
  hasFavs: hasAnyFavourites(),
  favourites: {
    bus: [],
    tram: [],
    train: [],
  },
  tempFavs: {
    bus: [],
    tram: [],
    train: [],
  },
};

export const GlobalContext = createContext<CreateContextProps<InitialStateProps, ActionType>>([
  initialState,
  () => {},
]);

export const GlobalContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const reducer = (state: InitialStateProps, action: ActionType) => {
    switch (action.type) {
      case 'SET_EDIT_MODE':
        return {
          ...state,
          editMode: action.payload,
        };

      case 'UPDATE_DATA': {
        return {
          ...state,
          favourites: action.payload,
        };
      }

      case 'UPDATE_TEMP_DATA': {
        const { mode, data } = action.payload;
        const favsToAdd = [
          ...state.tempFavs[mode].filter(fav => fav.stopAtcoCode !== data.stopAtcoCode),
        ];
        if (data.lines.length) {
          favsToAdd.push(data);
        }
        return {
          ...state,
          tempFavs: {
            ...state.tempFavs,
            [mode]: favsToAdd,
          },
        };
      }

      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider value={[state, dispatch]}>{children} </GlobalContext.Provider>;
};
