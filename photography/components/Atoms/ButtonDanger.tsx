import {ReactElement} from 'react';
import {NextPage} from 'next';

type Props = {
	handleClick: () => void;
	text: string;
}

const ButtonDanger: NextPage<Props> = (Props: Props): ReactElement => {
	return (
		<div className='bg-red-600 w-32 mx-4 my-auto rounded-md text-center px-2 py-1 shadow-sm hover:cursor-pointer hover:bg-red-500 transition-all' onClick={Props.handleClick}>{Props.text}</div>
	);
};

export default ButtonDanger;