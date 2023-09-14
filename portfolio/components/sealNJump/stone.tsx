export type Stone = {
	posX: number;
	stoneType: number;
	width: number;
	height: number;
}

export const drawStones = (canvasContext: any, stones: Stone[]) => {
	const newStones: Stone[] = [];

	for(let i = 0; i < stones.length; i++)
	{
		const stone = stones[i];
		if(stone.posX > -200) {
			stone.posX -= 9;

			canvasContext.beginPath();
			canvasContext.rect(stone.posX, 1450, stone.width, stone.height);
			canvasContext.fillStyle = '#ffffff';
			canvasContext.fill();
			canvasContext.closePath();
		}
	}

	return stones;
};