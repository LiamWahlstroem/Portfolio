import React from 'react';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';

const Users = () => {
	return (
		<LayoutAdmin currentPage='users'>
			<div>
				<h1>My account</h1>
			</div>
			<div>
				<h1>Manage Accounts</h1>
			</div>
		</LayoutAdmin>
	);
};

export default Users;