const drawMovingShape = (p, verts) => {
	const moveVerts = () => {
		const time = p.millis() / 1000;
		const amplitude = 0.5;
		const frequency = 3.5;
		for (let i = 0; i < verts.length; i++) {
			const x = verts[i].x + amplitude * p.sin(frequency * time + i);
			const y = verts[i].y + amplitude * p.cos(frequency * time + i);
			verts[i] = { x, y };
		}
	};

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

export default drawMovingShape;