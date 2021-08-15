import { Alignment, FlexBox } from "@lumx/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CharacterDetailsHeader,
  ComicsList,
  DataConsumer,
  EDataStatus,
} from "..";
import {
  getCharacter,
  getCharacterComics,
  getCharacterEvents,
} from "../../api";
import { ICharacterDetails } from "../../Utils/types";
import CharacterEventsList from "../CharacterEventsList/CharacterEventsList";

interface IParams {
  characterId: string;
}

export const CharacterDetails: React.FC = () => {
  const { characterId } = useParams<IParams>();
  const [dataProvider, setDataProvider] = useState<{
    dataStatus: EDataStatus;
    data: ICharacterDetails;
  }>({
    dataStatus: EDataStatus.loading,
    data: {
      character: undefined,
      comics: [],
      events: [],
    },
  });

  useEffect(() => {
    //loadCharacters
    (async () => {
      try {
        const charactersPromise = getCharacter(characterId);
        const comicsPromise = getCharacterComics({
          characters: characterId,
          orderBy: "-onsaleDate",
          limit: 4,
        });
        const eventsPromise = getCharacterEvents({
          characters: characterId,
          orderBy: "-modified",
        });
        const [characters, comics, events] = await Promise.all([
          charactersPromise,
          comicsPromise,
          eventsPromise,
        ]);
        const dataStatus =
          characters.values.length > 0
            ? EDataStatus.success
            : EDataStatus.failure;
        const character =
          dataStatus === EDataStatus.success ? characters.values[0] : undefined;

        setDataProvider({
          dataStatus: dataStatus,
          data: {
            character: character,
            comics: comics,
            events: events,
          },
        });
      } catch {
        setDataProvider({ ...dataProvider, dataStatus: EDataStatus.error });
      }
    })();
    // eslint-disable-next-line
  }, [characterId]);

  const successJSX = () => (
    <FlexBox hAlign={Alignment.center} id="character-details-flexblox">
      <CharacterDetailsHeader character={dataProvider.data.character} />
      <FlexBox id="character-more-flexbox" vAlign={Alignment.center}>
        <CharacterEventsList
          title="All events"
          events={dataProvider.data.events}
        />
        <ComicsList title="Latest comics" comics={dataProvider.data.comics} />
      </FlexBox>
    </FlexBox>
  );

  return (
    <DataConsumer
      successJSX={successJSX}
      dataStatus={dataProvider.dataStatus}
    />
  );
};
