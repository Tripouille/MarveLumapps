import { Kind, Message } from '@lumx/react';
import React from 'react';
import { BoxLoading } from 'react-loadingg';

export enum EDataStatus {
	loading = "loading",
	success = "success",
	failure = "failure",
	error = "error"
}

export interface IProps {
	dataStatus: EDataStatus;
	successJSX: JSX.Element;
}

/* 
coucou
*/
const DataConsumer: React.FC<IProps> = ({ dataStatus, successJSX }) => {
	switch (dataStatus) {
		case EDataStatus.loading:
			return <BoxLoading color="#0000ff" speed={0.3} size="large" />
		case EDataStatus.success:
			return (successJSX);
		case EDataStatus.failure:
			return (
				<Message className='message' kind={Kind.warning} hasBackground>
					<p>No data available sorry :[</p>
				</Message>);
		case EDataStatus.error:
			return (
				<Message className='message' kind={Kind.error} hasBackground>
					<p>Oops something went wrong :(</p>
				</Message>);
		default:
			return null;
	}
}

export default DataConsumer;