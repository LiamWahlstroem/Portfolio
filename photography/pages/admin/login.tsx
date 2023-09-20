import type {NextPage} from 'next';
import Head from 'next/head';
import useRouter from 'next/router';
import IsUserAuthenticated from '../../lib/hooks/useIsAuthenticated'
import {useEffect} from "react";

const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    const URL = '/api/login'

    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            alg: 'HS256',
            typ: 'JWT',
        },
        body: JSON.stringify({
            username: ev.target.username.value,
            password: ev.target.password.value,
        }),
    })

    if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('JWT', data.token);
        await useRouter.push('/admin/overview');
    } else {
        alert('Login failed');
    }
}

const Login: NextPage = () => {
    useEffect(() => {
        if (IsUserAuthenticated()) {
            useRouter.push('/admin/overview').then(() => {
            })
        }
    }, [])

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main>
                <form onSubmit={handleSubmit}>
                    <input type='text'
                           name='username'
                           id='username'
                           placeholder='Username'
                    />
                    <input type='password'
                           name='password'
                           id='password'
                           placeholder='Password'
                    />
                    <input type='submit'/>
                </form>
            </main>
        </>
    );
};

export default Login;
