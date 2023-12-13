'use client';

import drawMovingShape from '../lib/drawMovingShape';
import {useEffect, useRef} from 'react';

const MainBackground = () => {
	const drawElement = useRef();
	const numVerts = 14;
	const radius = 250;
	const verts: { x: number; y: number; }[] = [];

	const createVerts = () => {
		for (let i = 0; i < numVerts; i++) {
			const rad = (i * 2 * Math.PI) / numVerts;
			const x = radius * Math.cos(rad) + 400 + Math.random() * 60;
			const y = radius * Math.sin(rad) + 400 + Math.random() * 60;

			verts.push({ x, y });
		}
	};

	useEffect(() => {
		createVerts();

		import('p5').then((p5) => {
			const sketch = (p) => {
				p.setup = () => {
					p.createCanvas(window.innerWidth, window.innerHeight);
					p.noLoop();
				};

				p.draw = () => {
					p.background(0);
					drawMovingShape(p, verts);
				};
			};

			const p5Instance = new p5.default(sketch, drawElement.current);

			const intervalId = setInterval(() => {
				p5Instance.redraw();
			}, 15);

			return () => {
				clearInterval(intervalId);
				p5Instance.remove();
			};
		});
	}, []);

	return <div className='w-full h-full overflow-hidden relative z-1' ref={drawElement.current}></div>;
};

export default MainBackground;
