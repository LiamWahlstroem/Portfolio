'use client';

import React, { ReactElement } from 'react';
import Head from 'next/head';
import '../../globals.css';

type Props = {
	children: React.ReactNode;
};

const RootLayout = ({ children }: Props): ReactElement => {
	return (
		<html lang="en">
			<Head>
				<title>Login</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<main>
					{children}
				</main>
			</body>
		</html>
	);
};

export default RootLayout;