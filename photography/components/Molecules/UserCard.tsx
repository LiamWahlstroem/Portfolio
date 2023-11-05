import React from 'react';

type Props = {
	username: string;
	role: string;
	id: string;
}

const UserCard = (Props: Props) => {
	return (
		<div className='border-black'>
			<p>Username: {Props.username}</p>
			<p>Role: {Props.role}</p>
			<p>ID: {Props.id}</p>
		</div>
	);
};

export default UserCard;