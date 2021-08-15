import { IRawCharacter, ICharacter, IComic, IRawComic } from "./types";

export function formatDescription(description: string): string {
  const descriptionTrimed = description.trim();

  return descriptionTrimed.length > 0
    ? descriptionTrimed
    : "No description available";
}

export function formatDate(rawDate: string): string {
  const date: Date = new Date(rawDate);
  let day: string = date.getDate().toString().padStart(2, "0");
  let month: string = (1 + date.getMonth()).toString().padStart(2, "0");
  let year: number = date.getFullYear();

  return isNaN(year) ? "Unknown" : `${day}/${month}/${year}`;
}

export function formatCharacter(character: IRawCharacter): ICharacter {
  return {
    id: character.id,
    description: formatDescription(character.description),
    name: character.name,
    image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
  };
}

export function formatComic(comic: IRawComic): IComic {
  const price = comic.prices.find(
    (price: { type: string }) => price.type === "printPrice"
  )?.price;
  const onsale = comic.dates.find(
    (date: { type: string }) => date.type === "onsaleDate"
  )?.date;

  return {
    title: comic.title,
    price: price ? price : "Unknown",
    onsale: onsale ? formatDate(onsale) : "Unknown",
  };
}
