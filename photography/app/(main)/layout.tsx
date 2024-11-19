// app/layout.tsx
'use client';

import React, {ReactElement} from 'react';
import Head from 'next/head';
import Navbar from '../../components/Organisms/Navbar';
import Footer from '../../components/Organisms/Footer';
import {NavbarProvider} from '../shared/NavbarContext';
import '../globals.css';

type Props = {
    children: React.ReactNode;
};

const RootLayout = ({ children }: Props): ReactElement => {
	return (
		<html lang="en">
			<Head>
				<title>Hey There</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<NavbarProvider>
					<Navbar />
					<main>
						{children}
					</main>
					<Footer />
				</NavbarProvider>
			</body>
		</html>
	);
};

export default RootLayout;