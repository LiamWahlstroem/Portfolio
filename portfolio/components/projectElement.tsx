import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
	title: string;
	id: number;
	content: string;
	linkGithub: string;
	linkWebsite: string;
};

const ProjectElement = (props: Props) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div
			onClick={() => setIsOpen(!isOpen)}
			className={`text-white border-y-2 border-y-white mx-48 my-2 py-2 px-2 transition-all duration-150 hover:cursor-pointer ease-linear ${
				isOpen ? 'max-h-96' : 'max-h-12'
			}`}
		>
			<div className='w-full flex flex-row items-center justify-between space-x-8'>
				<h1 className={`text-lg transition-all ${isOpen ? 'text-2xl' : ''}`}>
					{props.title}
				</h1>
				<ArrowRight strokeWidth={2} size={32} />
			</div>
			<div className={'overflow-hidden ' + (isOpen ? 'block' : 'hidden')}>
				<p className='mt-4 mb-6'>{props.content}</p>
				<div className='flex flex-col items-center text-gray-200 italic'>
					<Link href={props.linkWebsite} className=''>Website</Link>
					<Link href={props.linkGithub}>Github</Link>
				</div>
			</div>
		</div>
	);
};

export default ProjectElement;
