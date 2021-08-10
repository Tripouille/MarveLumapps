import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharactersList, Pagination } from '..';
import { getCharacters } from '../../api/api';
import { BoxLoading } from 'react-loadingg';
import { Kind, Message } from '@lumx/react';

interface IParams {
	searchQuery: string;
	currentPage: string;
}

interface IProps {
	path: string;
	detailsPath: string;
}

enum EStatus {
	loading = "loading",
	success = "success",
	failure = "failure"
}

const SearchResult: React.FC<IProps> = ({ path, detailsPath }) => {
	const characterPerPage = 4;
	const { searchQuery, currentPage } = useParams<IParams>();
	const [characters, setCharacters] = useState([]);
	const [availableCharacters, setavailableCharacters] = useState(0);
	const [status, setStatus] = useState<EStatus>(EStatus.loading);
	console.log("SearchResult render");

	useEffect(() => {
		setCharacters([]);
		setavailableCharacters(0);
		setStatus(EStatus.loading);
		const loadCharacters = async () => {
			const results = await getCharacters({ nameStartsWith: searchQuery.trim(), orderBy: 'name',
										offset: (+currentPage - 1) * characterPerPage, limit: characterPerPage});
			setCharacters(results.data);
			setavailableCharacters(results.data.length > 0 ? results.total : 0);
			setStatus(results.data.length > 0 ? EStatus.success : EStatus.failure);
		};
		loadCharacters();
	}, [searchQuery, currentPage]);

	
	if (status === EStatus.loading) return <BoxLoading  color="#0000ff" speed={0.3} size="large" />
	else if (status === EStatus.success) return (
		<section className="lumx-spacing-padding-horizontal-huge">
			<CharactersList characters={characters} detailsPath={detailsPath} />
			<Pagination itemPerPage={characterPerPage} itemNumber={availableCharacters} path={`${path}/${searchQuery}`} />
		</section>
	);
	else if (status === EStatus.failure) return (
		<Message id='error-message' kind={Kind.error} hasBackground>
			<p>
				Oops something went wrong.
			</p>
		</Message>
	);
	else return null;
};

export default SearchResult;