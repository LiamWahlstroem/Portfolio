import React, { useEffect, useRef } from 'react';

const Test = () => {
	const drawElement = useRef<HTMLDivElement>();

	useEffect(() => {
		import('p5').then((p5) => {
			const sketch = (p: p5) => {
				p.setup = () => {
					p.createCanvas(200, 200);
					p.background(0);
				};

				p.draw = () => {
					p.background(0);
					p.fill(255);
					p.ellipse(p.mouseX, p.mouseY, 50, 50);
				};
			};

			new p5.default(sketch, drawElement.current);
		});
	}, []);

	return <div className='w-full h-full' ref={drawElement}></div>;
};

export default Test;
