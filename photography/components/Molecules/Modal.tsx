import React, {ReactElement} from 'react';
import {ModalOpenMethod} from '../../lib/Types/ModalOpenMethod';
import ButtonIcon from '../Atoms/ButtonIcon';
import * as feather from 'feather-icons';

type Props = {
	modalOpen: (value: boolean) => void;
	children: React.ReactNode;
}

const handleOuterDivClick = (event: React.MouseEvent<HTMLDivElement>, modalOpen: ModalOpenMethod): void => {
	if (event.target === event.currentTarget) {
		modalOpen(false);
	}
};

const Modal = (Props: Props): ReactElement => {
	return (
		<div className='bg-black bg-opacity-95 fixed inset-0 flex items-center justify-center' onClick={(ev) => handleOuterDivClick(ev, Props.modalOpen)}>
			<div className='bg-white mx-20'>
				<div className='flex justify-end mr-2 mt-2 h-8'>
					<ButtonIcon icon={feather.icons.x} handleClick={Props.modalOpen}/>
				</div>
				<div className='items-center justify-center flex'>
					{Props.children}
				</div>
			</div>
		</div>
	);
};

export default Modal;