import React, {ReactElement, useRef} from 'react';
import SelectorOption from '../Atoms/SelectorOption';
import ButtonDanger from '../Atoms/ButtonDanger';
import {ModalOpenMethod} from '../../lib/Types/ModalOpenMethod';
import TextInputSmall from '../Atoms/TextInputSmall';
import ButtonSubmit from '../Atoms/ButtonSubmit';

type Props = {
	imageCategory: string;
	imageId: string;
	modalOpen: ModalOpenMethod;
	imageAlt: string;
}

const FormEdit = (Props: Props): ReactElement => {
	const options = [
		{value: 'urban', text: 'Urban'},
		{value: 'nature', text: 'Nature'},
		{value: 'cars', text: 'Cars'},
		{value: 'blackWhite', text: 'Black & White'}
	];
	const altText = useRef<string>('');

	const setAltText = (value: string) => {
		altText.current = value;
	};


	const handleDelete = () => {
		const URL = '/api/delete/' + Props.imageId;
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

		fetch(URL, {
			method: 'DELETE',
			headers: {
				authorization: token,
			},
		}).then(res => res.json())
			.then(r => {
				if(r.err) {
					alert(r.err.message);
				}
				else {
					Props.modalOpen(false);
				}
			});
	};

	const handleSave = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const URL = '/api/put/' + Props.imageId;
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

		fetch(URL, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				authorization: token,
			},
			body: JSON.stringify({
				category: ev.currentTarget.category.value,
				alt: altText.current,
			})
		}).then(res => res.json())
			.then(r => {
				if(r.err) {
					alert(r.err);
				}
				else {
					Props.modalOpen(false);
				}
			});
	};

	return (
		<form className='pr-8 flex flex-col justify-end pb-8' onSubmit={(ev) => handleSave(ev)}>
			<select id='category' defaultValue={Props.imageCategory} className="block w-full rounded-lg border-gray-400 mb-4">
				{options.map(el => <SelectorOption text={el.text} value={el.value} key={el.value}/>)}
			</select>
			<TextInputSmall placeholder='Alt Text' inputValue={setAltText} defaultValue={Props.imageAlt}/>
			<ButtonDanger text='Delete' handleClick={handleDelete} />
			<ButtonSubmit buttonText='Save Changes' />
		</form>
	);
};

export default FormEdit;