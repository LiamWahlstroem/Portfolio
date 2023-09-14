import Image from 'next/image';

type Props = {
	logo: any;
	name: string;
	description: string;
}

const StackContainer = (props: Props) => {
	return(
		<div className='flex justify-center py-4 mx-[20%] h-[13rem] mt-4 hover:transition-all duration-500 hover:bg-[#0c0c0c] border-gray-900 border-2 border-solid text-center text-[1.4rem] rounded-2xl'>
			<div className='w-[20%] px-8 flex items-center justify-center'><Image src={props.logo} /></div>
			<h1 className='w-[20%] border-x-2 border-gray-900 border-solid flex items-center justify-center'>{props.name}</h1>
			<p className='w-[70%] flex items-center justify-center'>{props.description}</p>
		</div>
	);
};

export default StackContainer;