import axios from "axios";
import { API_KEY } from "../utils/constants";
import { formatCharacter, formatComic } from "../utils/format";
import {
  ICharactersInfos,
  ICharactersQueryParams,
  IComic,
  IEvent,
  IComicsQueryParams,
  IEventsQueryParams,
} from "../utils/types";

const instance = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
  timeout: 3000,
});

const baseQueryParams = {
  apikey: API_KEY,
};

/**
 * Perform a get on the axios instance with the given query params and the .env API_KEY
 * @param url the route extension
 * @param query additional params
 */
const get = (url: string, query?: object) =>
  instance.get(url, {
    params: {
      ...query,
      ...baseQueryParams,
    },
  });

export async function getCharacters(
  params: ICharactersQueryParams
): Promise<ICharactersInfos> {
  const { data: charactersData } = await get("characters", params);

  return {
    total: charactersData.data.total,
    values: charactersData.data.results.map(formatCharacter),
  };
}

export async function getCharacter(
  characterId: string
): Promise<ICharactersInfos> {
  const { data: charactersData } = await get(`characters/${characterId}`);

  return {
    total: charactersData.data.total,
    values: charactersData.data.results.map(formatCharacter),
  };
}

export async function getCharacterComics(
  params: IComicsQueryParams
): Promise<IComic[]> {
  const { data: characterComicsData } = await get("comics", params);

  return characterComicsData.data.results.map(formatComic);
}

export async function getCharacterEvents(
  params: IEventsQueryParams
): Promise<IEvent[]> {
  const { data: characterEventsData } = await get("events", params);

  return characterEventsData;
}
