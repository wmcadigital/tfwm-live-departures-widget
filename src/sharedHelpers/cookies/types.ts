export interface DisruptionFavs {
  favCookieAllowed: boolean | undefined;
  hideFavsHelpMsg: boolean | undefined;
  favs: Favs | undefined;
}

export interface Favs {
  bus?: string[] | undefined;
  train?: TrainFavEntity[] | undefined;
  tram?: string[] | undefined;
  roads?: RoadsFavEntity[] | undefined;
}
export interface TrainFavEntity {
  from: string | undefined;
  line: string | undefined;
  to: string | undefined;
}

export interface RoadsFavEntity {
  address: string | undefined;
  lat: number | undefined;
  lon: number | undefined;
  radius: number | undefined;
}

export interface StopStationFavs {
  bus?: FavMode[] | undefined;
  train?: FavMode[] | undefined;
  tram?: FavMode[] | undefined;
}
export interface FavMode {
  stopAtcoCode: string;
  stopName: string;
  lines: FavLineEntity[];
}
export interface FavLineEntity {
  id: string;
  name: string;
  routeName: string;
}
