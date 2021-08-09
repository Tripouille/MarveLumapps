/* eslint-disable react/prop-types */
import React from 'react';
import { Alignment, Button, FlexBox, TextField, Theme } from '@lumx/react';
import { mdiMagnify } from '@lumx/icons';

interface IProps {
	searchQuery: string;
	setSearchQuery: (searchQuery: string) => void;
	onSearch: () => void;
}

const SearchField: React.FC<IProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
	const onEnterPress: React.EventHandler<React.KeyboardEvent<InputEvent>> = ({ key }) => {
		if (key === 'Enter') {
			onSearch();
		}
	}

	return (
		<FlexBox id="search-flexbox" hAlign={Alignment.center}>
			<TextField theme={Theme.dark} placeholder="Search ..." icon={mdiMagnify} value={searchQuery} onChange={setSearchQuery} onKeyPress={onEnterPress} />
			<Button id="search-button" onClick={onSearch}>
				Search
			</Button>
		</FlexBox>
	);
}

export default SearchField;