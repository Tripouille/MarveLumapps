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
    <FlexBox id="character-header-flexbox" vAlign={Alignment.center}>
      <FlexBox id="character-infos-flexbox" hAlign={Alignment.center}>
        <Button id="previous-page-button" onClick={previousPage}>
          Back to results
        </Button>
        <h1 id="character-name">{character.name}</h1>
        <div id="character-description">{character.description}</div>
      </FlexBox>
      <img
        id="character-image"
        src={character.image}
        alt={character.name}
      ></img>
    </FlexBox>
  ) : null;
};
