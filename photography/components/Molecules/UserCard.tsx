import React from 'react';
import Button from '../Atoms/Button';
import {UserResponse} from '../../lib/Types/UserTypes';
import ButtonDanger from '../Atoms/ButtonDanger';

type Props = {
	user: UserResponse;
	edit: boolean;
	password: boolean;
	handleSelectEdit: (value: UserResponse, edit: boolean) => void;
	handleSelectPassword: ((value: UserResponse) => void) | undefined;
	fetchData: () => void;
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
				} else {
					Props.fetchData();
				}
			});
	};

	return (
		<div className='flex flex-row items-center space-x-5 py-2 px-4 mx-12 border-solid border-black border-2 rounded-md mb-6'>
			<p>ID: {Props.user.id}</p>
			<p>Username: {Props.user.username}</p>
			<p>Role: {Props.user.role}</p>
			<div className='flex flex-row items-center'>
				{Props.edit && <Button handleClick={() => Props.handleSelectEdit(Props.user, true)} text='Edit User'/>}
				{Props.password && Props.handleSelectPassword !== undefined && <Button handleClick={() => Props.handleSelectPassword!(Props.user)} text='Change Password'/>}
				{Props.edit && <ButtonDanger text="Delete User" handleClick={handleDelete} />}
			</div>
		</div>
	);
};

export default UserCard;