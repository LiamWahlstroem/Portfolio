import {ReactElement} from 'react';
import NavbarItem from '../Atoms/NavbarItem';
import NavbarContainer from '../Atoms/NavbarContainer';
import {useNavbar} from '../../app/shared/NavbarContext';

const Navbar = (): ReactElement => {
	const headerItems = [
		{text: 'Gallery', value: 'home', link: '/'},
	];
	const { value } = useNavbar();

	return (
		<NavbarContainer>
			{headerItems.map(el => <NavbarItem text={el.text} link={el.link} value={el.value} currentPage={value} key={el.value}/>)}
		</NavbarContainer>
	);
};

export default Navbar;