import React from "react";
import { FlexBox, Alignment, Button, Thumbnail, AspectRatio } from "@lumx/react";
import { Link } from "react-router-dom";
import { ICharacter } from "../../Utils/types";

interface IProps {
  character: ICharacter;
  path: string;
}

export const Character: React.FC<IProps> = ({ character, path }) => {
  return (
    <FlexBox className="character-flexbox" vAlign={Alignment.left}>
      <Thumbnail className="character-image" image={character.image} alt={character.name} aspectRatio={AspectRatio.original} />
      <FlexBox className="character-infos-flexbox" vAlign={Alignment.left}>
        <Link aria-label="See details" to={path}>
          <h1 className="character-name">{character.name}</h1>
        </Link>
        <div className="character-description">{character.description}</div>
        <Link to={path}>
          <Button className="see-details-button">See details</Button>
        </Link>
      </FlexBox>
    </FlexBox>
  );
};