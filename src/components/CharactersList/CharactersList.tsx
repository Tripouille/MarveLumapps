import React from 'react'
import { Character } from '..';
import { ICharacter } from '../../api/api'

interface IProps {
	characters: ICharacter[];
	detailsPath: string;
}

const CharactersList: React.FC<IProps> = ({ characters, detailsPath }) => {
	console.log("CharactersList render");

	return (
		<>
			{
				characters.map((character: ICharacter, i: number) => (
					<Character key={i} character={character} path={`${detailsPath}/${character.id}`} />
				))
				
			}
		</>
	);
}

export default CharactersList;