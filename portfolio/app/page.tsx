import Head from 'next/head';
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Background from '../components/Atoms/Background';

const Page = () => {
	return (
		<>
			<Head>
				<title>Hey There</title>
			</Head>
			<Navbar currentPage='home' />
			<main>
				<div className='h-screen max-w-screen flex flex-row bg-gradient-to-tr from-neutral-900 to-neutral-700 text-white'>
					<Background />
					<h1 className='w-[60%] h-fit mr-20 mt-60 py-4 text-8xl font-bold drop-shadow-2xl'>
						Building Stuff
						<br />
						for Things
					</h1>
				</div>
				<div className='relative -mt-12 py-12 bg-stone-950 text-white'>
					<h1 className='flex flex-row justify-center pb-4 font-bold text-4xl'>Hey it's me, Liam</h1>
					<p className='flex flex-row px-40 justify-center text-lg text-center'>
						I'm a Software Developer focusing on Web and Embedded development, with some mediocre CAD skills.
						<br />
						<br />
						I enjoy working on projects in TypeScript and C++ and am always looking for new challenges to tackle and new things to learn.
					</p>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Page;
