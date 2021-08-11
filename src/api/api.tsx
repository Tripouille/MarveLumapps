import axios from "axios";

const instance = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
  timeout: 3000,
});

const baseQueryParams = {
  apikey: process.env.REACT_APP_MARVEL_API_KEY,
};

const get = (url: string, query: {}) =>
  instance.get(url, {
    params: {
      ...query,
      ...baseQueryParams,
    },
  });

function setDescription(description: string): string {
  const descriptionTrimed = description.trim();

  return descriptionTrimed.length > 0
    ? descriptionTrimed
    : "No description available";
}

function formatDate(rawDate: any) {
  const date = new Date(rawDate);
  let day = date.getDate().toString().padStart(2, "0");
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let year = date.getFullYear();

  return [day, month, year].includes(NaN)
    ? "Unknown"
    : `${day}/${month}/${year}`;
}

interface IRawCharacter {
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

export async function getCharacters(params: {}) {
  const { data: charactersData } = await get("characters", params);
  const formatedCharactersData = charactersData.data.results.map(
    (character: IRawCharacter): ICharacter => ({
      id: character.id,
      description: setDescription(character.description),
      name: character.name,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    })
  );

  return { total: charactersData.data.total, values: formatedCharactersData };
}

export async function getCharacter(characterId: string) {
  const { data: charactersData } = await get(`characters/${characterId}`, {});
  const formatedCharactersData = charactersData.data.results.map(
    (character: IRawCharacter): ICharacter => ({
      id: character.id,
      description: setDescription(character.description),
      name: character.name,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    })
  );

  return { total: charactersData.data.total, values: formatedCharactersData };
}

export interface IRawComic {
  title: string;
  prices: any;
  dates: any;
}

export interface IComic {
  title: string;
  price: string;
  onsale: string;
}

export async function getCharacterComics(params: {}) {
  const { data: characterComicsData } = await get("comics", params);

  return characterComicsData.data.results.map(
    (comic: IRawComic): IComic => ({
      title: comic.title,
      price: comic.prices.find((price: any) => price.type === "printPrice")
        .price,
      onsale: formatDate(
        comic.dates.find((date: any) => date.type === "onsaleDate").date
      ),
    })
  );
}

export interface IEvent {
  title: string;
  description: string;
}

export async function getCharacterEvents(params: {}) {
  const { data: characterEventsData } = await get("events", params);

  return characterEventsData.data.results.map(
    (event: IEvent): IEvent => ({
      title: event.title,
      description: event.description,
    })
  );
}
