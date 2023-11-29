import React, { useEffect, useRef } from 'react';

const Test = () => {
	const drawElement = useRef(); // Initialize with null
	const numVerts = 20;
	const radius = 150;

	useEffect(() => {
		import('p5').then((p5) => {
			const sketch = (p: p5) => {
				p.setup = () => {
					p.createCanvas(p.windowWidth, p.windowHeight);
				};

				p.draw = () => {
					p.beginShape();

					for(let i = 0; i < numVerts; i++) {
						const rad = i * (2 * Math.PI / numVerts);
						const x = (radius * Math.cos(rad)) + 400;
						const y = (radius * Math.sin(rad)) + 400;

						p.curveVertex(x, y);
					}

					p.endShape();
				};
			};

			new p5.default(sketch, drawElement.current);
		});
	}, []);

	return <div className='w-full h-full' ref={drawElement}></div>; // Remove .current
};

export default Test;
