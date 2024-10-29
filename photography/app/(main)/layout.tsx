// app/layout.tsx
'use client';

import React, { ReactElement } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Organisms/Navbar';
import Footer from '../../components/Organisms/Footer';
import '../globals.css';

type Props = {
    children: React.ReactNode;
    currentPage: string;
};

const RootLayout = ({ children, currentPage }: Props): ReactElement => {
    return (
        <html lang="en">
            <Head>
                <title>Hey There</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Navbar currentPage={currentPage} />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;