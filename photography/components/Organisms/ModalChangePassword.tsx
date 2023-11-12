import React from 'react';
import FormChangePassword from '../Molecules/FormChangePassword';
import Modal from '../Molecules/Modal';

type Props = {
	isOpen: (value: boolean) => void;
}

const ModalChangePassword = (Props: Props) => {
	return (
		<Modal modalOpen={Props.isOpen}>
			<FormChangePassword />
		</Modal>
	);
};

export default ModalChangePassword;