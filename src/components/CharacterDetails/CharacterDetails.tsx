import { Alignment, FlexBox } from '@lumx/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharacterDetailsHeader, DataConsumer, EDataStatus } from '..';
import { getCharacter } from '../../api/api';

interface IParams {
	characterId: string;
}

const CharacterDetails: React.FC = () => {
	const { characterId } = useParams<IParams>();
	const [dataProvider, setDataProvider] = useState({dataStatus: EDataStatus.loading, data: undefined});

	useEffect(() => {
		if (dataProvider.dataStatus !== EDataStatus.loading)
			setDataProvider({...dataProvider, dataStatus: EDataStatus.loading});
		const loadCharacters = async () => {
			try {
				const results = await getCharacter(characterId);
				const dataStatus = results.values.length > 0 ? EDataStatus.success : EDataStatus.failure;
				const data = dataStatus === EDataStatus.success ? results.values[0] : undefined;

				setDataProvider({dataStatus: dataStatus, data: data});
			} catch {
				setDataProvider({...dataProvider, dataStatus: EDataStatus.error});
			}
		};
		loadCharacters();
	// eslint-disable-next-line
	}, [characterId]);

	const successJSX = (
		<FlexBox hAlign={Alignment.center} id="character-details-flexblox">
			<CharacterDetailsHeader character={dataProvider.data} /> 
		</FlexBox>
	);

	return <DataConsumer successJSX={successJSX} dataStatus={dataProvider.dataStatus} />
}

export default CharacterDetails;