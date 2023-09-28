import React, {ReactElement} from 'react';
import {ModalOpenMethod} from '../../lib/Types/ModalOpenMethod';

type Props = {
	modalOpen: ModalOpenMethod;
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
			<div className='bg-white flex mx-32 my-32 items-center justify-center'>
				{Props.children}
			</div>
		</div>
	);
};

export default Modal;