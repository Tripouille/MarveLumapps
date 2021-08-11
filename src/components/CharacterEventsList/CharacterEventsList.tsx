
import React from 'react';
import { Alignment, FlexBox } from '@lumx/react';
import { CharacterEvent } from '..';
import { IEvent } from '../../api/api';

interface IProps {
	title: string;
	events: IEvent[];
}

const CharacterEventsList: React.FC<IProps> = ({ title, events }) => {
	const availableEvents = events.length ? events.map((event, index) => <CharacterEvent key={index} event={event} />) 
										: <p className="error-message">No events available</p>;

	return (
		<FlexBox vAlign={Alignment.left} id="events-collection">
			<h2 id="events-collection-title">{title}</h2>
			{availableEvents}
		</FlexBox>
	);
}

export default CharacterEventsList;