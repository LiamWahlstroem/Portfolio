import ButtonSubmit from '../Atoms/ButtonSubmit';
import TextInputSmall from '../Atoms/TextInputSmall';
import React from 'react';
import ButtonDanger from '../Atoms/ButtonDanger';

type props = {
	name: string;
	date: string;
	setName: (value: string) => void;
	setDate: (value: string) => void;
	handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
	handleDelete: () => void;
}

const CollectionEdit  = (Props: props) => {

	return (
		<form onSubmit={Props.handleSubmit}>
			<TextInputSmall placeholder='Collection Name' inputValue={Props.setName} defaultValue={Props.name} />
			<TextInputSmall placeholder='Date' inputValue={Props.setDate} defaultValue={Props.date} />
			<ButtonDanger handleClick={Props.handleDelete} text='Delete'/>
			<ButtonSubmit buttonText='Update Collection'/>
		</form>
	);
};

export default CollectionEdit;