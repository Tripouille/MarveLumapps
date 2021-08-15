export interface ICharactersQueryParams {
  name?: string;
  nameStartsWith?: string;
  modifiedSince?: Date;
  comics?: number;
  series?: number;
  events?: number;
  stories?: number;
  orderBy?: string;
  limit?: number;
  offset?: number;
}

export interface IRawCharacter {
  id: string;
  description: string;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface ICharacter {
  id: string;
  description: string;
  name: string;
  image: string;
}

export interface ICharactersInfos {
  total: number;
  values: ICharacter[];
}

export interface IComicsQueryParams {
  characters?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
}

export interface IRawComic {
  title: string;
  prices: { type: string; price: string }[];
  dates: { type: string; date: string }[];
}

export interface IComic {
  title: string;
  price: string;
  onsale: string;
}

export interface IEventsQueryParams {
  characters?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
}

export interface IEvent {
  title: string;
  description: string;
}

export interface ICharacterDetails {
  character?: ICharacter;
  comics: IComic[];
  events: IEvent[];
}
