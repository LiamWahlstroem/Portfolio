'use client';

import {ReactElement} from 'react';
import NavbarItem from '../Atoms/NavbarItem';
import NavbarContainer from '../Atoms/NavbarContainer';
import {useNavbar} from '../../app/shared/NavbarContext';

const AdminNavbar = (): ReactElement => {
	const items = [
		{text: 'Edit', value: 'edit', link: '/admin/edit'},
		{text: 'Add Image', value: 'create', link: '/admin/addImage'},
		{text: 'Create Collections', value: 'collectionCreate', link: '/admin/createCollection'},
		{text: 'User management', value: 'users', link: '/admin/users'},
	];

	const { value } = useNavbar();

	return (
		<NavbarContainer>
			{items.map(el => <NavbarItem text={el.text} value={el.value} link={el.link} currentPage={value} key={el.link}/>)}
		</NavbarContainer>
	);
};

export default AdminNavbar;