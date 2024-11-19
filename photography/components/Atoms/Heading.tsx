import React from 'react';

type Props = {
	text: string
}

const Heading = (Props: Props) => {
	return (
		<h1 className='text-xl font-bold'>
			{Props.text}
		</h1>
	);
};

export default Heading;