import {useRef, useEffect, useState} from 'react';
import {Seal, drawSeal} from './sealNJump/seal';
import {getRandom} from '../utilities/functions';
import {Stone, drawStones} from './sealNJump/stone';
import scoreCounter from './sealNJump/scoreCounter';
import collisions from './sealNJump/collisions';

const SealNJump = () => {
	const URL = '/api/addLeaderboard';
	const gameStarted = useRef<boolean>(false);
	const canvasRef = useRef(null);
	const seal = useRef<Seal>({sealX: 0, sealY: 0, vY: 76.5, sealStatus: 0});
	let stones: Stone[] = [];
	const score = useRef<number>(0);
	const [isGameOver, setGameOver] = useState(false);

	useEffect(() => {
		window.addEventListener('keydown', (event) => {
			event.preventDefault();
			if(event.key === 'ArrowUp')
			{
				if(gameStarted.current)
				{
					if(seal.current.sealStatus !== 3 && seal.current.sealStatus !== 4 && seal.current.sealStatus !== 1)
						seal.current.sealStatus = 3;
				}
				else
				{
					startGame();
				}
			}
		});

		if(!isGameOver)
		{
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');
			canvas.style.width ='1250px';
			canvas.style.height ='100%';

			const interval = setInterval(() => {
				if(collisions(context, seal.current, stones))
				{
					seal.current.sealStatus = 4;
					window.removeEventListener('keydown', (ev: any) => {return;});
					setGameOver(true);
				}
				else
				{
					context.clearRect(0, 0, canvas.width, canvas.height);
					score.current = scoreCounter(context, score.current, seal.current.sealStatus);
					seal.current = drawSeal(context, canvas.width, seal.current);
					stones = drawStones(context, stones);
				}
			}, 16);
			return () => clearInterval(interval);
		}
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if(seal.current.sealStatus !== 0 && seal.current.sealStatus !== 1)
			{
				const newStone: Stone = {posX: 2200, stoneType: 0, width: 0, height: 0};
				newStone.stoneType = getRandom(0, 3);
				if(newStone.stoneType === 1)
				{
					newStone.width = 100;
				}
				else if(newStone.stoneType === 2)
				{
					newStone.width = 250;
				}
				else {
					newStone.width = 300;
				}
				newStone.height = 200;
				stones.push(newStone);
			}
		}, getRandom(4000, 7000));
		return () => clearInterval(interval);
	});

	const startGame = () => {
		gameStarted.current = true;
		seal.current.sealStatus = 1;
	};

	const handleSubmit = async(ev: any) =>
	{
		ev.preventDefault();

		fetch(URL, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				name: ev.target.name.value,
				score: score.current,
			}),
		}).then((response) => {
			console.log(response);
			if (response.status == 200)
			{
				gameStarted.current = false;
				seal.current = {sealX: 0, sealY: 0, vY: 76.5, sealStatus: 0};
				stones = [];
				score.current = 0;
				setGameOver(false);
			}
			else if (response.status == 500)
				alert('Server Response 500: Unable to save post');
		});
	};

	const skipLeaderboard = () => {
		gameStarted.current = false;
		seal.current = {sealX: 0, sealY: 0, vY: 76.5, sealStatus: 0};
		stones = [];
		score.current = 0;
		setGameOver(false);
	};

	return (
		<>
			{
				isGameOver ?
					<div className='text-white flex flex-col items-center text-center justify-center'>
						<h1 className='text-[2.3rem] mb-12'>Your Score: {Math.floor(score.current)}</h1>
						<form onSubmit={handleSubmit}>
							<h2 className='text-[2rem] mb-12'>Save your score to the public Leaderboard:</h2>
							<input type='text' id='name' placeholder='display name' maxLength={20} className='bg-black border-b-gray-700 border-b-2 border-b-solid mb-12 w-[25vw] focus:outline-none text-[1.6rem]'/> <br/>
							<input type='submit' value='Upload to Leaderboard' className='text-[1.4rem] py-4 px-12 hover:cursor-pointer hover:transition-all duration-500 hover:bg-[#0c0c0c] border-gray-700 border-2 border-solid rounded-2xl'/>
						</form>
						<div onClick={skipLeaderboard} className='text-[1.4rem] mt-6 py-4 px-12 hover:cursor-pointer hover:transition-all duration-500 hover:bg-[#0c0c0c] border-gray-700 border-2 border-solid rounded-2xl'>Continue without adding to Leaderboard</div>
					</div>
					:
					<canvas ref={canvasRef} height='1600' width='2500'></canvas>
			}
		</>
	);
};

export default SealNJump;