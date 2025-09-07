'use client';

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ProjectElement from '../../components/projectElement';
import projectData from '../../lib/projectData.json';

const Page = () => {
	const data = projectData.projects;

	return (
		<div className='flex flex-col min-h-screen w-screen bg-black'>
			<Navbar currentPage={'projects'} />
			<main className='h-80'>
				<div className='mx-40'>
					<div className='ml-16 mb-12'>
					</div>
					<div className='font-body'>
						{data.map((project) => <ProjectElement
							title={project.name}
							id={project.id}
							short={project.short}
                            description={project.description}
							technologies={project.technologies}
							linkGithub={project.linkGithub}
							linkWebsite={project.linkWebpage}
                            key={project.id}
						/>)}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Page;