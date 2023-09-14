const scoreCounter = (canvasContext: any, currentScore: number, sealStatus: number) => {

	canvasContext.font = '50px sans';
	canvasContext.fillText(Math.floor(currentScore).toString(), 1910, 90);

	if(sealStatus === 0 || sealStatus === 1)
	{
		return currentScore;
	}

	currentScore += 0.1;

	return currentScore;
};

export default scoreCounter;