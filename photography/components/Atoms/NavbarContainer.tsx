import {ReactElement, useEffect, useState} from 'react';

type Props = {
	children: React.ReactNode;
};


const NavbarContainer = (Props: Props): ReactElement => {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const scrollHandler = () => {
			setScroll(window.scrollY > 50);
		};

		window.addEventListener('scroll', scrollHandler);

		return () => {
			window.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	return (
		<div className={`sticky top-0 flex flex-col z-10 max-w-[100%] py-6 ${scroll ? 'transition-all bg-black' : 'transition-all bg-transparent'}`}>
			<ul className='flex space-x-10 ml-12 text-[1.5rem] text-gray-400'>
				{Props.children}
			</ul>
		</div>
	);
};

export default NavbarContainer;