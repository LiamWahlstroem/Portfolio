import {Seal} from './seal';
import {Stone} from './stone';
import {checkForCollision} from '../../utilities/functions';

const collisions = (canvasContext: any, seal: Seal, stones: Stone[]) => {
	const sealCollision = {posX: seal.sealX, posY: seal.sealY, width: 200, height: 150 };

	for(let i = 0; i < stones.length; i++)
	{
		const stoneCollision = {posX: stones[i].posX, posY: 1450, width: stones[i].width, height: stones[i].height};

		if(checkForCollision(sealCollision, stoneCollision))
		{
			return true;
		}
	}
};

export default collisions;