'use client';

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ProjectElement from '../../components/projectElement';
import projectData from '../../lib/projectData.json';
import Title from '../../components/Atoms/Title';

const Page = () => {
	const data = projectData.projects;

	return (
		<div className='flex flex-col bg-black'>
			<Navbar currentPage={'projects'} />
			<main className='h-80'>
				<div className='mx-40'>
					<div className='ml-16 mb-12'>
						<Title title='Projects'/>
					</div>
					{data.map((project) => <ProjectElement
						title={project.name}
						id={project.id}
						content={project.description}
						linkGithub={project.linkGithub}
						linkWebsite={project.linkWebpage}
					/>)}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Page;