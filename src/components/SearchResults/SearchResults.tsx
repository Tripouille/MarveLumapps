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
	failure = "failure",
	error = "error"
}

const SearchResult: React.FC<IProps> = React.memo(({ path, detailsPath }) => {
	console.log("render SearchResult");
	const characterPerPage = 4;
	const { searchQuery, currentPage } = useParams<IParams>();
	const [characters, setCharacters] = useState([]);
	const [availableCharacters, setAvailableCharacters] = useState(0);
	const [status, setStatus] = useState<EStatus>(EStatus.loading);

	useEffect(() => {
		setCharacters([]);
		setAvailableCharacters(0);
		setStatus(EStatus.loading);
		const loadCharacters = async () => {
			try {
				const results = await getCharacters({ nameStartsWith: searchQuery.trim(), orderBy: 'name',
									offset: (+currentPage - 1) * characterPerPage, limit: characterPerPage});
				console.table(results);
				setCharacters(results.data);
				setAvailableCharacters(results.data.length > 0 ? results.total : 0);
				setStatus(results.data.length > 0 ? EStatus.success : EStatus.failure);
			} catch {
				setStatus(EStatus.error);
			}
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
		<Message id='error-message' kind={Kind.warning} hasBackground>
			<p>No results available soory :(</p>
		</Message>
	);
	else if (status === EStatus.error) return (
		<Message id='error-message' kind={Kind.error} hasBackground>
			<p>Oops something went wrong.</p>
		</Message>
	)
	else return null;
});

export default SearchResult;