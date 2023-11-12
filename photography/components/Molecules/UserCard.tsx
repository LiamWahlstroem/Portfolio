import React from 'react';
import Button from '../Atoms/Button';
import userResponse from '../../lib/Types/UserResponse';
import ButtonDanger from '../Atoms/ButtonDanger';

type Props = {
	user: userResponse;
	edit: boolean;
	password: boolean;
	handleSelectEdit: (value: userResponse) => void;
	handleSelectPassword: (value: userResponse) => void;
}

const UserCard = (Props: Props) => {
	const handleDelete = () => {
		const URL = '/api/user/delete/' + Props.user.id;
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

		fetch(URL, {
			method: 'DELETE',
			headers: {
				authorization: token,
			},
		}).then(res => res.json())
			.then(r => {
				if(r.err) {
					alert(r.err.message);
				}
			});
	};

	return (
		<div className='flex flex-row items-center space-x-5 py-2 px-4 mx-12 border-solid border-black border-2 rounded-md'>
			<p>ID: {Props.user.id}</p>
			<p>Username: {Props.user.username}</p>
			<p>Role: {Props.user.role}</p>
			<div className=''>
				{Props.edit && <Button handleClick={() => Props.handleSelectEdit(Props.user)} text='Edit User'/>}
				{Props.password && <Button handleClick={() => Props.handleSelectPassword(Props.user)} text='Change Password'/>}
				{Props.edit && <ButtonDanger text="Delete User" handleClick={handleDelete} />}
			</div>
		</div>
	);
};

export default UserCard;