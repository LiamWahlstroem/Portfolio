export const getRandom = (min: number, max: number) => {
	return Math.floor(Math.random() * (max-min) + min);
};

export const checkForCollision = (objectOne: {posX: number, posY: number, width: number, height: number}, objectTwo: {posX: number, posY: number, width: number, height: number}) => {
	return objectOne.posX < objectTwo.posX + objectTwo.width &&
		objectOne.posX + objectOne.width > objectTwo.posX &&
		objectOne.posY < objectTwo.posY + objectTwo.height &&
		objectOne.height + objectOne.posY > objectTwo.posY;
};