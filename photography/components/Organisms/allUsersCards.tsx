import React from 'react';
import Button from '../Atoms/Button';
import UserCard from '../Molecules/UserCard';
import Heading from '../Atoms/Heading';
import {UserResponse} from '../../lib/Types/UserTypes';

type Props = {
	users: UserResponse[];
	handleSelectEdit: (value: UserResponse, edit: boolean) => void;
	fetchData: () => void;
}

const AllUsersCards = (Props: Props) => {
	return (
		<div className='mt-4'>
			<div className='flex flex-row ml-12 mb-4'>
				<Heading text='Manage Users'/>
				<Button handleClick={() => Props.handleSelectEdit({username: '', role: 'admin', id: ''}, false)} text='Create User'/>
			</div>
			<div>
				{Props.users.map((el: UserResponse) => <UserCard user={el} edit={true} password={false} handleSelectEdit={() => Props.handleSelectEdit(el, true)} handleSelectPassword={undefined} key={el.id} fetchData={Props.fetchData}/>)}
			</div>
		</div>
	);
};

export default AllUsersCards;