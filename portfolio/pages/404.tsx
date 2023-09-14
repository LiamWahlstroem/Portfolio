import SealNJump from '../components/sealNJump';
import {useState} from 'react';

const error = () => {
	const [gameLoaded, setGameLoaded] = useState(false);

	return (
		<>
			{gameLoaded ?
				<div>
					<div className='w-screen h-screen bg-black flex flex-col justify-center items-center'>
						<h1 className='text-white text-[3.5rem] mb-12'>Seal n' Jump</h1>
						<div className='w-[1050px] h-[700px] overflow-hidden'>
							<SealNJump />
						</div>
					</div>
				</div>
				:
				<div className='bg-black h-screen w-screen flex flex-col items-center justify-center'>
					<div className='text-white text-[6rem] flex'>
						<h1 className=''>404</h1>
						<h1 className='ml-16 pl-12 border-l-2 border-l-white'>Page not found</h1>
					</div>
					<div onClick={() => {setGameLoaded(true);}} className='bg-black hover:transition-all duration-500 hover:bg-[#0c0c0c] border-gray-900 border-2 border-solid mt-8 px-8 py-4 rounded-xl text-[1.8rem] text-gray-400 hover:cursor-pointer'>
						<h1>Play Seal n Jump</h1>
					</div>
				</div>
			}
		</>
	);
};

export default error;