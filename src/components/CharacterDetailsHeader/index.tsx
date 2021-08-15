import { Alignment, Button, FlexBox } from "@lumx/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { ICharacter } from "../../Utils/types";

interface IProps {
  character?: ICharacter;
}

export const CharacterDetailsHeader: React.FC<IProps> = ({ character }) => {
  const history = useHistory();

  const previousPage = () => {
    if (history.action !== "POP") history.goBack();
    else history.push("/");
  };

  return character ? (
    <FlexBox className="character-header-container" vAlign={Alignment.center}>
      <FlexBox className="character-infos-container" hAlign={Alignment.center}>
        <Button className="previous-page-button" onClick={previousPage}>
          Back to results
        </Button>
        <h1 className="character-name">{character.name}</h1>
        <div className="character-description">{character.description}</div>
      </FlexBox>
      <img
        className="character-image"
        src={character.image}
        alt={character.name}
      ></img>
    </FlexBox>
  ) : null;
};
