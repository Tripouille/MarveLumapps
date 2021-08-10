import React from 'react';
import { Comic } from '..';

interface IProps {
	title: string;
	comics?: [];
}

const ComicsList: React.FC<IProps> = ({ title, comics }) => {
	if (comics) return (
		<div id="comics-list">
			<h2 id="list-title">{title}</h2>
			{
				comics!.map((comic, index) => <Comic key={index} comic={comic} />)
			}
		</div>
	)
	else return (
		<div id="comics-list">
			<h2 id="list-title">No available Comics</h2>
		</div>
	)
}

export default ComicsList;