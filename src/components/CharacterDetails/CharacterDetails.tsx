import { Alignment, FlexBox } from '@lumx/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharacterDetailsHeader, ComicsList, DataConsumer, EDataStatus } from '..';
import { getCharacter, getCharacterComics } from '../../api/api';

interface IParams {
	characterId: string;
}

const CharacterDetails: React.FC = () => {
	const { characterId } = useParams<IParams>();
	const [dataProvider, setDataProvider] = useState({dataStatus: EDataStatus.loading, character: undefined, comics: undefined});

	useEffect(() => {
		if (dataProvider.dataStatus !== EDataStatus.loading)
			setDataProvider({...dataProvider, dataStatus: EDataStatus.loading});
		const loadCharacters = async () => {
			try {
				const results = await getCharacter(characterId);
				const comics = await getCharacterComics({characters: characterId, orderBy: '-onsaleDate', limit: 4});
				const dataStatus = results.values.length > 0 ? EDataStatus.success : EDataStatus.failure;
				const character = dataStatus === EDataStatus.success ? results.values[0] : undefined;

				setDataProvider({dataStatus: dataStatus, character: character, comics: comics});
			} catch {
				setDataProvider({...dataProvider, dataStatus: EDataStatus.error});
			}
		};
		loadCharacters();
	// eslint-disable-next-line
	}, [characterId]);

	const successJSX = (
		<FlexBox hAlign={Alignment.center} id="character-details-flexblox">
			<CharacterDetailsHeader character={dataProvider.character} />
			<FlexBox id="character-more-flexbox" vAlign={Alignment.center}>
				<ComicsList title="Latest comics" comics={dataProvider.comics}/>
			</FlexBox>
		</FlexBox>
	);

	return <DataConsumer successJSX={successJSX} dataStatus={dataProvider.dataStatus} />
}

export default CharacterDetails;