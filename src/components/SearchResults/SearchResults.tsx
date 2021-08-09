import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharactersList, Pagination } from '..';
import { getCharacters } from '../../api/api';

interface IParams {
	searchQuery: string;
	currentPage: string;
}

interface IProps {
	path: string
}

const SearchResult: React.FC<IProps> = ({ path }) => {
	const characterPerPage = 4;
	const { searchQuery, currentPage } = useParams<IParams>();
	const [characters, setCharacters] = useState([]);
	const [availableCharacters, setavailableCharacters] = useState(0);
	console.log("SearchResult render");

	useEffect(() => {
		setCharacters([]);
		setavailableCharacters(0);
		const loadCharacters = async () => {
			const results = await getCharacters({ nameStartsWith: searchQuery.trim(), orderBy: 'name',
										offset: (+currentPage - 1) * characterPerPage, limit: characterPerPage});
			setCharacters(results.data);
			setavailableCharacters(results.total);
		};
		loadCharacters();
	}, [searchQuery, currentPage]);

	return (
		<section className="lumx-spacing-padding-horizontal-huge">
			<CharactersList characters={characters} />
			<Pagination itemPerPage={characterPerPage} itemNumber={availableCharacters} path={`${path}/${searchQuery}`} />
		</section>
	);

};

export default SearchResult;