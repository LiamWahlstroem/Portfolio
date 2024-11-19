import {ReactElement} from 'react';

type Props = {
	buttonText: string
}

const ButtonSubmit = (Props: Props): ReactElement => {
	return (
		<input type='submit' value={Props.buttonText} className='bg-gray-300 w-32 mx-4 rounded-md text-center px-2 py-1 mt-8 shadow-sm hover:cursor-pointer hover:bg-gray-400 transition-all'/>
	);
};

export default ButtonSubmit;