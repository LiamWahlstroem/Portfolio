import React, {useEffect, useRef} from 'react';

const Test = () => {
	const drawElement = useRef();
	const numVerts = 12;
	const radius = 250;
	let verts: {
		x: number;
		y: number; }[] = [];

	const createVerts = () => {
		for (let i = 0; i < numVerts; i++) {
			const rad = (i * 2 * Math.PI) / numVerts;
			const x = radius * Math.cos(rad) + 400 + Math.random() * 60;
			const y = radius * Math.sin(rad) + 400 + Math.random() * 60;

			verts.push({ x, y });
		}
	};

	const moveVerts = () => {
		for (let i = 0; i < numVerts; i++) {
			verts[i].x += Math.random() * 1;
			verts[i].y += Math.random() * 1;
		}
	};

	useEffect(() => {
		createVerts();

		import('p5').then((p5) => {
			const sketch = (p) => {
				p.setup = () => {
					p.createCanvas(590, 400);
					p.frameRate(60);
				};

				p.draw = () => {
					p.background(0);

					moveVerts();

					p.beginShape();
					p.fill(255, 93, 0);
					p.stroke(255, 93, 0);

					for (let i = 0; i < verts.length; i++) {
						p.curveVertex(verts[i].x, verts[i].y);
					}

					p.curveVertex(verts[0].x, verts[0].y);
					p.curveVertex(verts[1].x, verts[1].y);
					p.curveVertex(verts[2].x, verts[2].y);

					p.endShape();
				};
			};

			const p5Instance = new p5.default(sketch, drawElement.current);

			return () => p5Instance.remove();
		});
	}, []);

	return <div className='w-full h-full' ref={drawElement.current}></div>;
};

export default Test;
