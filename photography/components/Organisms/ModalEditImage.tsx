import React, {ReactElement} from 'react';
import {ImageResponse} from '../../lib/Types/ImageType';
import {NextPage} from 'next';
import Modal from '../Molecules/Modal';
import FormImageEdit from '../Molecules/FormImageEdit';
import {CollectionResponse} from '../../lib/Types/CollectionType';

type Props = {
	image: ImageResponse;
	collections: CollectionResponse[];
	modalOpen: (value: boolean) => void;
}

const ModalEditImage: NextPage<Props> = (Props: Props): ReactElement => {
	return (
		<Modal modalOpen={Props.modalOpen}>
			<div className='relative max-h-[92vh] overflow-hidden flex-grow pb-8 px-8'>
				<img src={Props.image.imageURLMedium} alt={Props.image.alt} className='max-w-full max-h-[88vh]'/>
			</div>
			<FormImageEdit
				image={Props.image}
				collections={Props.collections}
				modalOpen={Props.modalOpen}
			/>
		</Modal>
	);
};

export default ModalEditImage;