/* eslint-disable react/prop-types */
import React from 'react';
import { FlexBox, Alignment } from '@lumx/react';
import { SearchField } from '../../components';
import logo from './logo.svg';

interface IProps {
	searchQuery: string;
	setSearchQuery: (searchQuery: string) => void;
	onSearch: () => void;
}

const Header: React.FC<IProps> = (props) => {
	return (
		<header className="lumx-spacing-padding-big header">
			<FlexBox id="header-flexbox" hAlign={Alignment.center}>
				<img id="marvel-logo" src={logo} alt="marvel logo" />
				<SearchField {...props} />
			</FlexBox>
		</header>
	);
};

export default Header;