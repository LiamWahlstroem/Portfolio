import type { NextPage } from 'next';
import Head from 'next/head';
import {motion} from 'framer-motion';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ProjectContainer from '../components/projectContainer';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Programming</title>
			</Head>
			<Navbar currentPage='programming'/>
			<main>
				<motion.div className='mb-24 text-[34rem] text-gray-300 tracking-tighter leading-none'
					transition={{type: 'spring', stiffness: 100}}
					whileHover={{letterSpacing: '30px', color: '#000'}}>
					<h1>Coding</h1>
					<h1>Projects</h1>
				</motion.div>
				<div className='pb-12 text-gray-400 bg-black'>
					<h1 className='pt-8 text-center text-[3rem]'>Projects:</h1>
					<p className='pb-4 text-center text-[1.3rem]'>Selection of some of my latest projects.</p>
					<div>
						<ProjectContainer
							extLink='https://github.com/L-390/'
							title='Personal Portfolio for 3D Work'
							description='Personal Portfolio Website for my 3D artwork. Written in three.js with Typescript.'
							reference='Github Repository'
						/>
						<ProjectContainer
							extLink='https://github.com/L-390/PortfolioWebsite'
							title='Personal Portfolio'
							description='Personal Portfolio Website to written in Next.js and Typescript, using Talwind CSS.'
							reference='Github Repository'
						/>
						<ProjectContainer
							extLink='https://github.com/L-390'
							title='Project Global: Head of Software Development'
							description='Volunteering as Head of Software Development at Project Global. Project Global is a small development group, developing Add-Ons for Microsoft flight Simulator 2020.'
							reference='Company Website'
						/>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Home;
