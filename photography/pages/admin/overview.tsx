import type { NextPage } from 'next';
import Head from 'next/head';
import AdminNavbar from '../../components/adminNavbar';
import React from 'react';
import {useRouter} from 'next/router';

const Overview: NextPage = () => {
	const router = useRouter();

	const deleteImage = async () => {

		const URL = '/api/delete/6505720b9774b26e6062a66e';
		const token = 'Bearer ' + sessionStorage.getItem('JWT');

		fetch(URL, {
			method: 'DELETE',
			headers: {
				authorization: token,
			},
		}).then(res => res.json())
			.then(data => {
				if(data.err) {
					alert(data.err);
				}
				else {
					alert(data.msg);
				}
			});
	};

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<AdminNavbar currentPage='overview' />
			<main>
				<div className='w-10 h-4 bg-black' onClick={deleteImage}></div>
			</main>
		</>
	);
};

export default Overview;
