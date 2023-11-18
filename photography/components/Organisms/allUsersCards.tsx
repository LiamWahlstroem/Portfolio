import React from 'react';
import Button from '../Atoms/Button';
import userResponse from '../../lib/Types/UserResponse';
import UserCard from '../Molecules/UserCard';
import Heading from '../Atoms/Heading';

type Props = {
	users: userResponse[];
	handleSelectEdit: (value: userResponse, edit: boolean) => void;
}

const AllUsersCards = (Props: Props) => {
	return (
		<div className='mt-4'>
			<div className='flex flex-row ml-12 mb-4'>
				<Heading text='Manage Users'/>
				<Button handleClick={() => Props.handleSelectEdit({username: '', role: 'admin', id: ''}, false)} text='Create User'/>
			</div>
			<div>
				{Props.users.map((el: userResponse) => <UserCard user={el} edit={true} password={false} handleSelectEdit={() => Props.handleSelectEdit(el, true)} handleSelectPassword={undefined} key={el.id}/>)}
			</div>
		</div>
	);
};

export default AllUsersCards;