import {ReactElement} from 'react';
import NavbarItem from '../Atoms/NavbarItem';
import NavbarContainer from '../Atoms/NavbarContainer';

type Props = {
    currentPage: string;
    backgroundBlack?: boolean;
}

const AdminNavbar = (Props: Props): ReactElement => {
	const items = [
		{text: 'Overview', value: 'overview', link: '/admin/overview'},
		{text: 'Create', value: 'create', link: '/admin/create'},
		{text: 'Edit', value: 'edit', link: '/admin/edit'},
		{text: 'User management', value: 'users', link: '/admin/users'},
	];

	return (
		<NavbarContainer>
			{items.map(el => <NavbarItem text={el.text} value={el.value} link={el.link} currentPage={Props.currentPage} key={el.link}/>)}
		</NavbarContainer>
	);
};

export default AdminNavbar;