import React from 'react';
import { useParams } from 'react-router-dom';

interface IParams {
	searchQuery: string;
	currentPage: string;
}

const SearchResult = () => {
	const { searchQuery, currentPage } = useParams<IParams>();
	console.log(SearchResult);

	return (
		<section className="lumx-spacing-padding-horizontal-huge">
			<p>/{searchQuery}/{currentPage}</p>
		</section>
	);
};

export default SearchResult;