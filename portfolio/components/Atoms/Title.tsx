import React from 'react';

type Props = {
    title: string;
}

const Title = (props: Props) => {
	return (
		<h1 className='text-3xl text-white'>{props.title}</h1>
	);
};

export default Title;