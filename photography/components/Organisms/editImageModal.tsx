import React, {FormEvent, ReactElement} from 'react';
import ImageResponse from '../../lib/Types/ImageResponse';
import {NextPage} from 'next';
import ButtonDanger from '../Atoms/ButtonDanger';
import Modal from '../Molecules/Modal';
import FormEdit from '../Molecules/FormEdit';

type Props = {
	image: ImageResponse,
	modalOpen: (value: boolean) => void,
}

const EditImageModal: NextPage<Props> = (Props: Props): ReactElement => {
	return (
		<Modal modalOpen={Props.modalOpen}>
			<div className='relative h-full overflow-hidden flex-grow py-8 px-8'>
				<img src={Props.image.imageURL} className='max-w-full max-h-full'/>
			</div>
			<FormEdit imageCategory={Props.image.category} imageId={Props.image.imageId} modalOpen={Props.modalOpen} />
		</Modal>
	);
};

export default EditImageModal;