import React from 'react';
import { Kind, Message } from '@lumx/react';

const Welcome: React.FC = () => {
	console.log("render Welcome");

	return (
		<Message id='welcome-message' kind={Kind.info} hasBackground>
			<p>
				Please use the search field to start your amazing research.
			</p>
		</Message>
	);
}

export default Welcome;