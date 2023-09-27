import type { NextPage } from 'next';
import Head from 'next/head';
import AdminNavbar from '../../components/adminNavbar';
import React from 'react';

const Overview: NextPage = () => {

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<AdminNavbar currentPage='overview' />
			<main>
			</main>
		</>
	);
};

export default Overview;
