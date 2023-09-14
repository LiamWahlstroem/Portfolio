import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Collections: NextPage = () => {
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