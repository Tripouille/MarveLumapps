/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Alignment, Button, FlexBox, TextField, Theme } from '@lumx/react';
import { mdiMagnify } from '@lumx/icons';

interface IProps {
	onSearch: (searchQuery: string) => void;
}

const SearchField: React.FC<IProps> = ({ onSearch }) => {
	console.log('render SearchField');
	const [searchQuery, setSearchQuery] = useState('');

	const onEnterPress: React.EventHandler<React.KeyboardEvent<InputEvent>> = ({ key }) => {
		if (key === 'Enter') {
			onSearch(searchQuery);
		}
	}

	return (
		<FlexBox id="search-flexbox" hAlign={Alignment.center}>
			<TextField theme={Theme.dark} placeholder="Search ..." icon={mdiMagnify} value={searchQuery} onChange={setSearchQuery} onKeyPress={onEnterPress} />
			<Button id="search-button" onClick={onSearch.bind(this, searchQuery)}>
				Search
			</Button>
		</FlexBox>
	);
}

export default SearchField;