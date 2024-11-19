import React, {ReactElement} from 'react';

type Props = {
	children: React.ReactNode;
};


const NavbarContainer = (Props: Props): ReactElement => {
	return (
		<div className={'sticky top-0 flex flex-col z-10 max-w-[100%] py-6 bg-white'}>
			<ul className='flex space-x-10 ml-12 text-[1.5rem] text-gray-600'>
				{Props.children}
			</ul>
		</div>
	);
};

export default NavbarContainer;