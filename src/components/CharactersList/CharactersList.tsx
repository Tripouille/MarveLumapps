import React from 'react'
import { Character } from '..';
import { ICharacter } from '../../api/api'

interface IProps {
	characters: ICharacter[];
}

const CharactersList: React.FC<IProps> = ({ characters }) => {
	console.log("CharactersList render");

	return (
		<>
			{
				characters.map((character: ICharacter, i: number) => (
					<Character key={i} character={character} path="/details" />
				))
				
			}
		</>
	);
}

export default CharactersList;