import React from 'react';
import TextInputSmall from '../Atoms/TextInputSmall';
import ButtonSubmit from '../Atoms/ButtonSubmit';
import Dropdown from '../Atoms/Dropdown';
import {CollectionResponse} from '../../lib/Types/CollectionType';

type Props = {
	handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
	imageURL: string;
	imageSelected: () => void;
	imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
	setAltText: (value: string) => void;
	setLocationText: (value: string) => void;
	setCollection: (value: string) => void;
	date: string;
	setDate: (value: string) => void;
	collections: CollectionResponse[];
}

const FormAdd = (Props: Props) => {
	return (
		<form onSubmit={Props.handleSubmit}>
			<div className='flex justify-center items-center mt-40'>
				<div className='flex flex-col w-[28rem] mx-24 items-center'>
					<div className='h-[32rem]'>
						{Props.imageURL === '' ? <></> : <img src={Props.imageURL} alt="Current Selected Image" className='h-fit max-h-[31rem] shadow-md'/>}
					</div>
					<input type='file' accept='png' name='imageUpload' onChange={Props.imageSelected} ref={Props.imageInputRef}/>
				</div>
				<div className='flex flex-col'>
					<TextInputSmall placeholder='Alt Text' inputValue={Props.setAltText} defaultValue={undefined}/>
					<TextInputSmall placeholder='Location' inputValue={Props.setLocationText} defaultValue={undefined} />
					<TextInputSmall placeholder='Date' inputValue={Props.setDate} defaultValue={Props.date} />
					<Dropdown inputValue={Props.setCollection} collections={Props.collections} name='Collection' defaultID={''}/>
					<ButtonSubmit buttonText='Upload'/>
				</div>
			</div>
		</form>
	);
};

export default FormAdd;