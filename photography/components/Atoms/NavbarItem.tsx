import Link from 'next/link';
import {NextPage} from 'next';
import {ReactElement} from 'react';

type Props = {
	link: string;
	text: string;
	value: string;
	currentPage: string;
}

const NavbarItem: NextPage<Props> = (Props: Props): ReactElement => {
	return(
		<li className={Props.currentPage === Props.value ? 'underline' : ''}><Link className='hover:cursor-pointer' href={Props.link}>{Props.text}</Link></li>
	);
};

export default NavbarItem;