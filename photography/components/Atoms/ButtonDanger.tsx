import {ReactElement} from 'react';
import {NextPage} from 'next';

type Props = {
	handleClick: () => void;
	text: string;
}

const ButtonDanger: NextPage<Props> = (Props: Props): ReactElement => {
	return (
		<div className='bg-red-500 w-32 mx-4 rounded-md text-center px-2 py-1 mt-8' onClick={Props.handleClick}>{Props.text}</div>
	);
};

export default ButtonDanger;