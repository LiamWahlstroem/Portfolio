import React from 'react';
import TextInputSmall from '../Atoms/TextInputSmall';
import ButtonSubmit from '../Atoms/ButtonSubmit';

type Props = {
	handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
	setTitle: (value: string) => void;
	date: string;
	setDate: (value: string) => void;
}

const FormCreate = (Props: Props) => {
	return (
		<form onSubmit={Props.handleSubmit}>
			<div className='flex justify-center items-center mt-48'>
				<div className=''>
					<TextInputSmall placeholder='Title' inputValue={Props.setTitle} defaultValue={undefined}/>
					<TextInputSmall placeholder='Date' inputValue={Props.setDate} defaultValue={Props.date} />
					<ButtonSubmit buttonText='Create'/>
				</div>
			</div>
		</form>
	);
};

export default FormCreate;