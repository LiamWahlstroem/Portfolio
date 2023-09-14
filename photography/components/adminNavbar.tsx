import Link from 'next/link';
import {useState, useEffect} from 'react';

type Props = {
    currentPage: string;
    backgroundBlack?: boolean;
}

const AdminNavbar = (props: Props) => {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        if(props.backgroundBlack === true)
        {
            setScroll(true);
        }
        else
        {
            const scrollHandler = () => {
                setScroll(window.scrollY > 50);
            };

            window.addEventListener('scroll', scrollHandler);

            return () => {
                window.removeEventListener('scroll', scrollHandler);
            };
        }
    }, []);

    return (
        <div className={`sticky top-0 flex flex-col z-10 max-w-[100%] py-6 ${scroll ? 'transition-all bg-black' : 'transition-all bg-transparent'}`}>
            <ul className='flex space-x-10 ml-12 text-[1.5rem] text-gray-400'>
                <li className={props.currentPage === 'overview' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/admin/overview'>Overview</Link></li>
                <li className={props.currentPage === 'create' ? 'underline' : ''}><Link className='hover:cursor-pointer' href='/admin/create'>Create</Link></li>
            </ul>
        </div>
    );
};

export default AdminNavbar;