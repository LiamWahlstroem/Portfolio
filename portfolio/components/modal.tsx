import React, {ReactElement} from 'react';
import ButtonIcon from './buttonIcon';
import * as feather from 'feather-icons';

type Props = {
    modalOpen: (value: boolean) => void;
    children: React.ReactNode;
}

const handleOuterDivClick = (event: React.MouseEvent<HTMLDivElement>, modalOpen: (value: boolean) => void): void => {
	if (event.target === event.currentTarget) {
		modalOpen(false);
	}
};

const modal = (Props: Props): ReactElement => {
	return (
		<div className='bg-black bg-opacity-90 fixed inset-0 flex items-center justify-center z-10' onClick={(ev) => handleOuterDivClick(ev, Props.modalOpen)}>
			<div className='bg-black mx-20 border-white border-2 border-solid'>
				<div className='flex justify-end mr-2 mt-2 h-8'>
					<ButtonIcon icon={feather.icons.x} handleClick={Props.modalOpen}/>
				</div>
				<div className='items-center p-4 justify-center'>
					{Props.children}
				</div>
			</div>
		</div>
	);
};

export default modal;