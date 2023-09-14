import type { NextPage } from 'next';
import Head from 'next/head';
import {motion} from 'framer-motion';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import StackContainer from '../components/stackContainer';
import {Logos} from '../components/data/Images';

const [TSLogo, NextLogo, CSLogo, MongoDBLogo, DockerLogo] = Logos;

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Tech Stack</title>
			</Head>
			<Navbar currentPage='stack'/>
			<main>
				<motion.div className='text-[35rem] text-gray-300 tracking-tighter leading-none'
					transition={{type: 'spring', stiffness: 100}}
					whileHover={{letterSpacing: '70px', color: '#000'}}>
					<h1>Tech</h1>
					<h1>Stack</h1>
				</motion.div>
				<div className='pb-12 text-gray-400 bg-black'>
					<h1 className='pt-8 text-center text-[3rem]'>Stack:</h1>
					<p className='pb-4 text-center text-[1.3rem]'>Some of the technologies I have experience using and I enjoy working with.</p>
					<div>
						<StackContainer
							logo={TSLogo}
							name='Typescript'
							description='Used for writing frontend(Next.js) and writing backend(Next.js/Express) Code.' />
						<StackContainer
							logo={NextLogo}
							name='Next.js'
							description='My go-to Frontend and Fullstack framework for personal projects' />
						<StackContainer
							logo={CSLogo}
							name='C#'
							description="I've regularly used C# at work and in school for everything ranging from Unity to Blazor and .net Core apps." />
						<StackContainer
							logo={MongoDBLogo}
							name='MongoDB'
							description='My preferred noSQL Database used in many of my projects without any relational data.' />
						<StackContainer
							logo={DockerLogo}
							name='Docker'
							description='My preferred way of deploying self-hosted Web Applications' />
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Home;
