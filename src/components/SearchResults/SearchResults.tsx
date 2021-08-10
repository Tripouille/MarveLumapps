import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { CharactersList, Pagination } from '..';
import { getCharacters } from '../../api/api';
import { BoxLoading } from 'react-loadingg';
import { Kind, Message } from '@lumx/react';

enum EStatus {
	loading = "loading",
	success = "success",
	failure = "failure",
	error = "error"
}

interface IParams {
	searchQuery: string;
	currentPage: string;
}

interface IProps {
	path: string;
	detailsPath: string;
}

interface IInfos {
	characters: [];
	availableCharacters: number;
	status: EStatus;
}

const reducer = (infos: IInfos , action: {type: string, payload?: {}}): IInfos => {
	switch (action.type) {
		case 'update':
			return ({...infos, ...action.payload});
		case 'reset':
			return ({characters: [], availableCharacters: 0, status: EStatus.loading});
		default:
			throw (new Error('Invalid action in searchResults reducer.'));
	}
}

const SearchResult: React.FC<IProps> = React.memo(({ path, detailsPath }) => {
	console.log("render SearchResult");
	const characterPerPage = 4;
	const { searchQuery, currentPage } = useParams<IParams>();
	const [infos, setInfos] = useReducer(reducer, {characters: [], availableCharacters: 0, status: EStatus.loading});

	useEffect(() => {
		if (infos.status !== EStatus.loading)
			setInfos({type: 'reset'});
		const loadCharacters = async () => {
			try {
				const results = await getCharacters({ nameStartsWith: searchQuery.trim(), orderBy: 'name',
				offset: (+currentPage - 1) * characterPerPage, limit: characterPerPage});
				setInfos({type: 'update', payload: {characters: results.data,
					availableCharacters: results.data.length > 0 ? results.total : 0,
					status: results.data.length > 0 ? EStatus.success : EStatus.failure}});
				} catch {
					setInfos({type: 'update', payload: {status: EStatus.error}});
				}
			};
			loadCharacters();
	// eslint-disable-next-line
	}, [searchQuery, currentPage]);

	if (infos.status === EStatus.loading) return <BoxLoading color="#0000ff" speed={0.3} size="large" />
	else if (infos.status === EStatus.success) return (
		<section className="lumx-spacing-padding-horizontal-huge">
			<CharactersList characters={infos.characters} detailsPath={detailsPath} />
			<Pagination itemPerPage={characterPerPage} itemNumber={infos.availableCharacters} path={`${path}/${searchQuery}`} />
		</section>
	);
	else if (infos.status === EStatus.failure) return (
		<Message id='error-message' kind={Kind.warning} hasBackground>
			<p>No results available soory :(</p>
		</Message>
	);
	else if (infos.status === EStatus.error) return (
		<Message id='error-message' kind={Kind.error} hasBackground>
			<p>Oops something went wrong.</p>
		</Message>
	)
	else return null;
});

export default SearchResult;