import React, {useEffect, useState} from 'react';

const AnimatedPoint = () => {
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		setPosition({
			x: Math.floor(Math.random() * window.innerWidth),
			y: Math.floor(Math.random() * window.innerHeight),
		});

		const updatePosition = () => {
			setPosition({
				x: Math.floor(Math.random() * 50),
				y: Math.floor(Math.random() * 50),
			});
		};

		const animationInterval = setInterval(updatePosition, 8000);

		return () => clearInterval(animationInterval);
	}, []);

	return (
		<div
			className='absolute text-2xl text-black'
			style={{transform: `translate(${position.x}px, ${position.y}px)`, transition: '30s linear'}}
		>•</div>
	);
};

export default AnimatedPoint;