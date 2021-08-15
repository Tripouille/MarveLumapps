import React from "react";
import { Comic } from "../Comic";
import { IComic } from "../../Utils/types";

interface IProps {
  title: string;
  comics: IComic[];
}

const ComicsList: React.FC<IProps> = ({ title, comics }) => {
  const availableComics = comics.length ? (
    comics.map((comic, index) => <Comic key={index} comic={comic} />)
  ) : (
    <p className="error-message">No comics available</p>
  );

  return (
    <div className="comics-container">
      <h2 className="list-title">{title}</h2>
      {availableComics}
    </div>
  );
};

export default ComicsList;
