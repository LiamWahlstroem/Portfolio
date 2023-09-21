import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
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