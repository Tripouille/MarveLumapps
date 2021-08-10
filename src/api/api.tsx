import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  timeout: 3000,
});

const baseQueryParams = {
  apikey: process.env.REACT_APP_MARVEL_API_KEY,
};

const get = (url: string, query: {}) => instance.get(url, {
  params: {
    ...query,
    ...baseQueryParams,
  },
});

function setDescription(description: string): string {
  const descriptionTrimed = description.trim()

  return descriptionTrimed.length > 0 ? descriptionTrimed : 'No description available';
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
  const { data: charactersData } = await get('characters', params);
  const formatedCharactersData = charactersData.data.results.map((character: IRawCharacter): ICharacter => ({
      id: character.id,
      description: setDescription(character.description),
      name: character.name,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
  }));

  console.table(charactersData);
  return {total: charactersData.data.total, data: formatedCharactersData};
}