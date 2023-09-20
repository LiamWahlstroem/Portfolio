import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FilterTag from "../components/filterTag";
import Tag from "../lib/Types/Tag";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const tagsToDisplay: Tag[] = [{displayName: 'Black and White', name: 'bw'}, {displayName: 'Street Photography', name: 'street'}, {displayName: 'Landscape', name: 'landscape'}];
const selectedTags: Tag[] = [];

const Collections: NextPage = () => {
    const [imageURLs, setImageURLs] = useState<string[]>([''])
    const router = useRouter()

    const TagClicked = (tag: Tag) => {
        console.log(tag.displayName);
    }

    useEffect(() => {
        const URL = '/api/get/getImages'

        fetch(URL, {
            method: 'GET',
        }).then(r => {
            if (r.status === 200) {
                return r.json();
            } else {
                router.push('/error').then();
            }
        }).then((data: any) => setImageURLs(data.imageURLs))
    }, []);

    return (
        <>
            <Head>
                <title>Hey There</title>
            </Head>
            <Navbar currentPage='collections'/>
            <main>
                <div>
                    <h1>Filters</h1>
                    <div>
                        <FilterTag tag={tagsToDisplay[0]} customClickEvent={TagClicked}/>
                        <FilterTag tag={tagsToDisplay[1]} customClickEvent={TagClicked}/>
                        <FilterTag tag={tagsToDisplay[2]} customClickEvent={TagClicked}/>
                    </div>
                </div>
                <div>
                    {imageURLs.map((el: string) => <img src={el} height={500} width={500}/>)}
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Collections;