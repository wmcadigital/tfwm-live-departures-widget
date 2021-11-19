// Types
import { DisruptionFavs, StopStationFavs, FavMode, Favs } from './types';

const getStopStationCookieData = (): StopStationFavs | undefined => {
  const cookies = document.cookie;
  const favouritesCookieName = 'favStopStation';
  const hasCookie = cookies.indexOf(favouritesCookieName) > -1;
  if (!hasCookie) return undefined;

  const cookieSplit = cookies.split('; ').find(row => row.startsWith(`${favouritesCookieName}=`));
  if (cookieSplit === undefined) return undefined;

  const cookieData = cookieSplit.split('=')[1];

  return JSON.parse(cookieData);
};

const getFavsFromCookies = (mode: 'bus' | 'train' | 'tram'): FavMode[] => {
  const cookieData = getStopStationCookieData();
  if (cookieData === undefined) return [];
  const favs = cookieData[mode];
  if (!favs) return [];
  return favs;
};

const getDisruptionCookieData = (): DisruptionFavs | undefined => {
  const cookies = document.cookie;
  const favouritesCookieName = 'disruptionsApp';
  const hasDisruptionsCookie = cookies.indexOf(favouritesCookieName) > -1;
  if (!hasDisruptionsCookie) return undefined;

  const cookieSplit = cookies.split('; ').find(row => row.startsWith(`${favouritesCookieName}=`));
  if (cookieSplit === undefined) return undefined;

  const cookieData = cookieSplit.split('=')[1];

  return JSON.parse(cookieData);
};

const getFavouritesFromCookies = (): Favs => {
  const cookieData = getDisruptionCookieData();
  if (cookieData === undefined) return {};
  const { favs } = cookieData;
  if (!favs) return {};
  return favs;
};

const hasAnyFavourites = (): boolean => {
  const modesWithFavourites = Object.values(getFavouritesFromCookies()).reduce(
    (accumulator, favouritesArray) => {
      let hasFavourites = false;
      if (favouritesArray.length) hasFavourites = true;
      return hasFavourites ? accumulator + 1 : accumulator;
    },
    0
  );
  return modesWithFavourites > 0;
};

const setCookie = (cname: string, cvalue: string, exdays: number): void => {
  const env = process.env.NODE_ENV || 'development';
  const cookieDomain = 'tfwm.org.uk';
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  const domain = env === 'development' ? 'domain=localhost' : `domain=.${cookieDomain}`;
  document.cookie = `${cname}=${cvalue};${expires};${domain};path=/`;
};

export {
  getStopStationCookieData,
  getFavsFromCookies,
  getDisruptionCookieData,
  getFavouritesFromCookies,
  hasAnyFavourites,
  setCookie,
};
