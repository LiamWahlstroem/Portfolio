import ImageResponse from '../../lib/Types/ImageResponse';
import {NextPage} from 'next';
import React, {ReactElement} from 'react';
import Modal from '../Molecules/Modal';

type Props = {
	image: ImageResponse,
	modalOpen: (value: boolean) => void,
}

const ImageModal: NextPage<Props> = (Props: Props): ReactElement => {
	return (
		<Modal modalOpen={Props.modalOpen}>
			<div className='relative h-full overflow-hidden flex-grow pb-8 px-8'>
				<img src={Props.image.imageURL} alt={Props.image.alt} className='max-w-full max-h-full'/>
			</div>
		</Modal>
	);
};

export default ImageModal;