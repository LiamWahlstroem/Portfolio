import Image from 'next/image';

type Props = {
    Image: typeof Image
    Name: string
    Text: string
}

const Stackbox = (props: Props) => {
	return(
		<div className='flex justify-center mx-[20%] h-[11rem] mt-4 hover:transition-all duration-500 hover:bg-[#0c0c0c] border-gray-900 border-2 border-solid text-center text-[1.4rem] rounded-2xl'>
			<div className='grid place-content-center w-[20%]'><div className='grid px-5 h-[100%] w-[100%] place-content-center'><Image src={props.Image}/></div></div>
			<h1 className='grid place-content-center w-[20%] border-x-2 px-12 border-gray-900 border-solid'>{props.Name}</h1>
			<p className='grid place-content-center w-[70%] px-16'>{props.Text}</p>
		</div>
	);
};

export default Stackbox;