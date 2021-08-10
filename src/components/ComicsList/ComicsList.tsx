import React from 'react';
import { Comic } from '..';

interface IProps {
	title: string;
	comics?: [];
}

const ComicsList: React.FC<IProps> = ({ title, comics }) => {
	const availableComics = comics?.length ? comics?.map((comic, index) => <Comic key={index} comic={comic} />) 
											: <p className="error-message">No comics available</p>;
										
	return (
		<div id="comics-list">
			<h2 id="list-title">{title}</h2>
			{availableComics}
		</div>
	);
}

export default ComicsList;