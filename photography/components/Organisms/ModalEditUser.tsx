import React from 'react';
import Modal from '../Molecules/Modal';
import FormUserEdit from '../Molecules/FormUserEdit';
import userResponse from '../../lib/Types/UserResponse';

type Props = {
	user: userResponse;
	modalOpen: (value: boolean) => void;
}

const ModalEditUser = (Props: Props) => {
	return (
		<Modal modalOpen={Props.modalOpen}>
			<FormUserEdit user={Props.user} isOpen={Props.modalOpen}/>
		</Modal>
	);
};

export default ModalEditUser;