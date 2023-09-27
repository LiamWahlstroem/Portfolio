import React, {FormEvent, ReactElement} from 'react';
import ImageResponse from '../lib/Types/ImageResponse';

type Props = {
	image: ImageResponse,
	modalOpen: (value: boolean) => void,
}

const handleOuterDivClick = (event: React.MouseEvent<HTMLDivElement>, modalOpen: (value: boolean) => void): void => {
	if (event.target === event.currentTarget) {
		modalOpen(false);
	}
};

const handleDelete = (image: string, modalOpen: (value: boolean) => void) => {
	const URL = '/api/delete/' + image;
	const token = 'Bearer ' + sessionStorage.getItem('JWT');

	fetch(URL, {
		method: 'DELETE',
		headers: {
			authorization: token,
		},
	}).then(res => res.json())
		.then(data => {
			if(data.err) {
				alert(data.err.message);
			}
			else {
				modalOpen(false);
			}
		});
};

const handleSave = (ev: FormEvent) => {
	ev.preventDefault();
};

const EditImageModal = (Props: Props): ReactElement => {
	return (
		<div className='bg-black bg-opacity-95 fixed inset-0 flex items-center justify-center' onClick={(ev) => handleOuterDivClick(ev, Props.modalOpen)}>
			<div className='bg-white flex mx-32'>
				<div className='relative h-full overflow-hidden flex-grow py-8 px-8'>
					<img src={Props.image.imageURL} className='max-w-full max-h-full'/>
				</div>
				<form className='pr-8 flex flex-col justify-end pb-8' onSubmit={(ev) => handleSave(ev)}>
					<select id="category" name="category" className="block w-full rounded-lg border-gray-400 focus:border-indigo-500 mb-4">
						<option selected={Props.image.category === 'urban'} value="urban">Urban</option>
						<option selected={Props.image.category === 'nature'} value="nature">Nature</option>
						<option selected={Props.image.category === 'cars'} value="cars">Cars</option>
						<option selected={Props.image.category === 'blackWhite'} value="blackWhite">Black & White</option>
					</select>
					<div className='bg-red-500 w-32 mx-4 rounded-md text-center px-2 py-1 mt-8' onClick={() => handleDelete(Props.image.imageId, Props.modalOpen)}>Delete</div>
					<input className='bg-gray-200 w-32 mx-4 rounded-md text-center px-2 py-1 mt-8' type='submit' value='Save Changes' />
				</form>
			</div>
		</div>
	);
};

export default EditImageModal;