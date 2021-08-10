import React from 'react';
import { FlexBox, Alignment, Button } from '@lumx/react';
import { Link } from 'react-router-dom';
import { ICharacter } from '../../api/api'

interface IProps {
	character: ICharacter;
	path: string
}

const Character: React.FC<IProps> = ({ character, path }) => {
	console.log('render Character');
	return (
		<FlexBox className="character-flexbox" vAlign={Alignment.left}>
			<img className="character-image" src={character.image} alt={character.name}></img>
			<FlexBox className="character-infos-flexbox" vAlign={Alignment.left}>
				<Link className="link" to={path}><h1 className="character-name">{character.name}</h1></Link>
				<div className="character-description">{character.description}</div>
				<Link className="link" to={path}><Button className="see-details-button">See details</Button></Link>
			</FlexBox>
		</FlexBox>
	);
}

export default Character;