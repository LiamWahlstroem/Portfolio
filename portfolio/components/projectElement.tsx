import React from 'react';
import Modal from './modal';
import Link from 'next/link';

type Props = {
	title: string;
	id: number;
    short: string;
    description: string;
	technologies: string;
	linkGithub: string;
	linkWebsite: string;
};

const ProjectElement = (props: Props) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div
			className='text-white mb-2'
			onClick={() => setIsOpen(!isOpen)}
		>
			<div className='max-w-fit hover:cursor-pointer'>
			    <h1>{props.title}</h1>
			    <p className='ml-4 text-green-600'>{'>'} {props.short}</p>
			</div>
			{isOpen &&
                <Modal modalOpen={setIsOpen}>
                	<h1>{props.title}</h1>
                	<p className='italic mt-0.5 mb-2'>{props.technologies}</p>
                	<p>{props.description}</p>
                	<div className='flex flex-col my-2 text-green-600'>
                		<Link href={props.linkGithub} target='_blank' className='max-w-fit hover:cursor-pointer'>{'>'} GitHub</Link>
                		{props.linkWebsite !== '' && <Link href={props.linkWebsite} target='_blank' className='max-w-fit hover:cursor-pointer'> {'>'} Website</Link>}
                	</div>
                </Modal>
			}
		</div>
	);
};

export default ProjectElement;
