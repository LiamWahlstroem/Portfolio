import React, {FormEvent, ReactElement} from 'react';
import SelectorOption from '../Atoms/SelectorOption';
import ButtonDanger from '../Atoms/ButtonDanger';
import {ModalOpenMethod} from '../../lib/Types/ModalOpenMethod';

type Props = {
	imageCategory: string;
	imageId: string;
	modalOpen: ModalOpenMethod
}

const FormEdit = (Props: Props): ReactElement => {
	const options = [
		{value: 'urban', text: 'Urban'},
		{value: 'nature', text: 'Nature'},
		{value: 'cars', text: 'Cars'},
		{value: 'blackWhite', text: 'Black & White'}
	];

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

	const handleSave = (ev: FormEvent<HTMLFormElement>) => {
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
				category: ev.target.category.value,
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
			<ButtonDanger text='Delete' handleClick={handleDelete} />
			<input className='bg-gray-200 w-32 mx-4 rounded-md text-center px-2 py-1 mt-8' type='submit' value='Save Changes' />
		</form>
	);
};

export default FormEdit;