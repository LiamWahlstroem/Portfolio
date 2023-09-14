import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FilterTag from "../components/filterTag";
import Tag from "../components/Types/Tag";

const tagsToDisplay: Tag[] = [{displayName: 'Black and White', name: 'bw'}, {displayName: 'Street Photography', name: 'street'}, {displayName: 'Landscape', name: 'landscape'}];
const selectedTags: Tag[] = [];

const Collections: NextPage = () => {
    const TagClicked = (tag: Tag) => {
        console.log(tag.displayName);
    }

    return (
        <>
            <Head>
                <title>Hey There</title>
            </Head>
            <Navbar currentPage='collections' />
            <main>
                <div>
                    <h1>Filters</h1>
                    <div>
                        <FilterTag tag={tagsToDisplay[0]} customClickEvent={TagClicked}/>
                        <FilterTag tag={tagsToDisplay[1]} customClickEvent={TagClicked}/>
                        <FilterTag tag={tagsToDisplay[2]} customClickEvent={TagClicked}/>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Collections;