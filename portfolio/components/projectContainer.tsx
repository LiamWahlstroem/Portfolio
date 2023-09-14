import Link from 'next/link';

type Props = {
	extLink: string;
	title: string;
	description: string;
	reference: string;
}

const ProjectContainer = (props: Props) => {
	return (
		<Link href={props.extLink}>
			<div className='flex justify-center py-4 mt-4 mx-[20%] h-[13rem] hover:transition-all duration-500 hover:bg-[#0c0c0c] border-gray-900 border-2 border-solid text-center text-[1.4rem] rounded-2xl hover:cursor-pointer'>
				<h1 className='w-[30%] border-r-2 border-gray-900 border-solid flex items-center justify-center'>{props.title}</h1>
				<p className='w-[70%] border-r-2 border-r-gray-900 border-r-solid flex items-center justify-center'>{props.description}</p>
				<div className='w-[20%] flex items-center justify-center'>{props.reference}</div>
			</div>
		</Link>
	);
};

export default ProjectContainer;
