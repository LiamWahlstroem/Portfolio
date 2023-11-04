import React, {ReactElement} from 'react';
import ImageResponse from '../../lib/Types/ImageResponse';
import {NextPage} from 'next';
import Modal from '../Molecules/Modal';
import FormEdit from '../Molecules/FormEdit';

type Props = {
	image: ImageResponse,
	modalOpen: (value: boolean) => void,
}

const EditImageModal: NextPage<Props> = (Props: Props): ReactElement => {
	return (
		<Modal modalOpen={Props.modalOpen}>
			<div className='relative h-full overflow-hidden flex-grow pb-8 px-8'>
				<img src={Props.image.imageURL} alt={Props.image.alt} className='max-w-full max-h-full'/>
			</div>
			<FormEdit imageId={Props.image.imageId} modalOpen={Props.modalOpen} imageAlt={Props.image.alt}/>
		</Modal>
	);
};

export default EditImageModal;