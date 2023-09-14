import type { NextPage } from 'next';
import Head from 'next/head';
import AdminNavbar from "../../components/adminNavbar";
import React from "react";
import {useRouter} from "next/router";

const Overview: NextPage = () => {
    const router = useRouter();

    const deleteImage = async () => {

        const URL = '/api/delete/650202130c083a8d8e84b91b';
        const token = 'Bearer ' + sessionStorage.getItem('JWT');

        const response = await fetch(URL, {
            method: 'DELETE',
            headers: {
                authorization: token,
            },
        });

        if (response.ok) {
            router.push('/admin/overview').then();
        } else {
            alert('Upload failed: ' + response.status);
        }
    }

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
