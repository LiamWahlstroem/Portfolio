import {NextPage} from 'next';
import {ReactElement} from 'react';

type Props = {
	handleClick: () => void;
	text: string;
}

const Button: NextPage<Props> = (Props: Props): ReactElement => {
	return (
		<div className='bg-gray-200 w-32 mx-4 rounded-md text-center px-2 py-1 mt-8 shadow-sm hover:cursor-pointer hover:bg-gray-400 transition-all' onClick={Props.handleClick}>{Props.text}</div>
	);
};

export default Button;