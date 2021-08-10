/* eslint-disable react/prop-types */
import React from 'react';
import { FlexBox, Alignment } from '@lumx/react';
import { SearchField } from '..';
import logo from './logo.svg';

interface IProps {
	onSearch: (searchQuery: string) => void;
}

const Header: React.FC<IProps> = ({ onSearch }) => {
	return (
		<header className="lumx-spacing-padding-big header">
			<FlexBox id="header-flexbox" hAlign={Alignment.center}>
				<img id="marvel-logo" src={logo} alt="marvel logo" />
				<SearchField onSearch={onSearch} />
			</FlexBox>
		</header>
	);
};

export default Header;