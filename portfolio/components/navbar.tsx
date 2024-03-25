import Link from 'next/link';

type Props = {
	currentPage: string;
	backgroundBlack?: boolean;
}

const Navbar = (props: Props) => {
	return (
		<div className='bg-neutral-900 sticky top-0 flex flex-col z-10 max-w-[100%] py-6 font-norm'>
			<ul className='flex space-x-10 ml-12 text-[1.5rem] text-gray-400'>
				<li className={props.currentPage === 'home' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/'>Home</Link></li>
				<li className={props.currentPage === 'stack' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/stack'>Tech Stack</Link></li>
				<li className={props.currentPage === 'projects' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/projects'>Projects</Link></li>
			</ul>
		</div>
		
	);
};

export default Navbar;