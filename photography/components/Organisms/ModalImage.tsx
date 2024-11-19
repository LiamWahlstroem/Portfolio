import {ImageResponse} from '../../lib/Types/ImageType';
import {NextPage} from 'next';
import React, {ReactElement} from 'react';
import Modal from '../Molecules/Modal';

type Props = {
	image: ImageResponse,
	modalOpen: (value: boolean) => void,
}

const ModalImage: NextPage<Props> = (Props: Props): ReactElement => {
	return (
		<Modal modalOpen={Props.modalOpen}>
			<div className='relative max-h-[92vh] overflow-hidden flex-grow pb-4 px-8'>
				<img src={Props.image.imageURLMedium} alt={Props.image.alt} className='max-w-full max-h-[88vh]'/>
				<p className='pt-2'>
					<i>Location: {Props.image.location}, Date: {Props.image.date}, Shot on: Fujifilm XT-4</i>
				</p>
			</div>
		</Modal>
	);
};

export default ModalImage;