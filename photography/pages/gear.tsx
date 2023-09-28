import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Organisms/navbar';
import Footer from '../components/Organisms/footer';
import {ReactElement} from 'react';

const Collections: NextPage = (): ReactElement => {
	return (
		<>
			<Head>
				<title>Hey There</title>
			</Head>
			<Navbar currentPage='gear' />
			<main>

			</main>
			<Footer />
		</>
	);
};

export default Collections;