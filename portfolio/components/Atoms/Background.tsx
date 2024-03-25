import React from 'react';

const Background = () => {
	let lines: string[] = [];

	for(let i = 0;  i < 65; i++) {
		lines.push('M 0 ' + i * 20 + ' L' + i * 40 + ' 1400');
	}

	return (
		<div className='h-full w-full  [mask-size:40px] [mask-repeat:no-repeat]'>
			<svg className='z-0 h-full w-full pointer-events-none absolute'>
				{lines.map((line, index) => <path key={index} d={line} stroke='#FFF' />)}
			</svg>
		</div>
	);
};

export default Background;