import Link from 'next/link';
import {useState, useEffect} from 'react';

type Props = {
	currentPage: string;
	backgroundBlack?: boolean;
}

const Navbar = (props: Props) => {
	return (
		<div className='bg-black sticky top-0 flex flex-col z-10 max-w-[100%] py-6 font-norm'>
			<ul className='flex space-x-10 ml-12 text-[1.5rem] text-gray-400'>
				<li className={props.currentPage === 'home' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/'>Home</Link></li>
				<li className={props.currentPage === 'stack' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/stack'>Tech Stack</Link></li>
				<li className={props.currentPage === 'programming' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/programming'>Programming</Link></li>
				<li className={props.currentPage === 'contact' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/contact'>Contact</Link></li>
			</ul>
		</div>
		
	);
};

export default Navbar;