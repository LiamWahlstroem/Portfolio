'use client';

import type {NextPage} from 'next';
import Head from 'next/head';
import {useRouter, notFound} from 'next/navigation';
import IsUserAuthenticated from '../../../lib/hooks/useIsAuthenticated';
import React, {useEffect, useRef} from 'react';
import TextInputSmall from '../../../components/Atoms/TextInputSmall';
import TextInputPassword from '../../../components/Atoms/TextInputPassword';
import ButtonSubmit from '../../../components/Atoms/ButtonSubmit';

const Login: NextPage = () => {
	const username = useRef<string>('');
	const password = useRef<string>('');
	const router = useRouter();

	const setUsername = (value: string) => {
		username.current = value;
	};

	const setPassword = (value: string) => {
		password.current = value;
	};

	useEffect(() => {
		if (IsUserAuthenticated()) {
			router.push('/admin/edit');
		}
	}, []);

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const URL = '/api/user/login';

		const res = await fetch(URL, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				alg: 'HS256',
				typ: 'JWT',
			},
			body: JSON.stringify({
				username: username.current,
				password: password.current,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			sessionStorage.setItem('JWT', data.token);
			sessionStorage.setItem('role', data.role);
			router.push('/admin/create');
		} else {
			alert('Login failed');
		}
	};

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<div>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col items-center mt-40'>
						<TextInputSmall  placeholder='Username' inputValue={setUsername} defaultValue={undefined}/>
						<TextInputPassword inputValue={setPassword} />
						<ButtonSubmit buttonText='Login' />
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
