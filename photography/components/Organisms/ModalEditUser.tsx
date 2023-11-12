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
			<FormUserEdit username={Props.user.username} role={Props.user.role}/>
		</Modal>
	);
};

export default ModalEditUser;