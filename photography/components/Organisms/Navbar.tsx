import {ReactElement} from 'react';
import NavbarItem from '../Atoms/NavbarItem';
import NavbarContainer from '../Atoms/NavbarContainer';

type Props = {
    currentPage: string;
    backgroundBlack?: boolean;
}

const Navbar = (Props: Props): ReactElement => {
	const headerItems = [
		{text: 'Home', value: 'home', link: '/'},
		{text: 'Gallery', value: 'gallery', link: '/gallery'},
		{text: 'My Gear', value: 'gear', link: '/gear'},
		{text: 'Contact', value: 'contact', link: '/contact'}
	];

	return (
		<NavbarContainer>
			{headerItems.map(el => <NavbarItem text={el.text} link={el.link} value={el.value} currentPage={Props.currentPage} key={el.value}/>)}
		</NavbarContainer>
	);
};

export default Navbar;