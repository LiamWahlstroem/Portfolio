import type { NextPage } from 'next';
import Head from 'next/head';
import {useState} from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ContactForm: NextPage = () => {
	const URL = '/api/addContactRequest';
	const [showForm, setShowForm] = useState(true);

	const submitData = async (ev: any) => {
		ev.preventDefault();

		fetch(URL, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				name: ev.target.name.value,
				mail: ev.target.email.value,
				subject: ev.target.subject.value,
				message: ev.target.message.value,
			}),
		}).then((response) => {
			console.log(response);
			if (response.status == 200)
				setShowForm(false);
			else if (response.status == 500)
				alert('Server Response 500: Unable to save post');
		});
	};

	return (
		<>
			<Head>
				<title>Contact</title>
			</Head>
			<Navbar backgroundBlack={true} currentPage='contact'/>
			<main>
				{showForm ?
					<div className='flex flex-col justify-center items-center text-center h-[90vh] max-h-[100vh] text-white bg-black'>
						<h1 className='text-[4rem] mb-12'>Contact</h1>
						<form onSubmit={submitData} className='text-gray-300'>
							<input type='text' id='name' placeholder='Name' required
								   className='bg-black border-b-gray-700 border-b-2 border-b-solid mb-12 w-[30vw] focus:outline-none text-[1.6rem]'/>
							<br/>
							<input type='Email' id='email' placeholder='E-Mail' required
								   className='bg-black border-b-gray-700 border-b-2 border-b-solid mb-12 w-[30vw] focus:outline-none text-[1.6rem]'/>
							<br/>
							<input type='text' id='subject' placeholder='Subject' required
								   className='bg-black border-b-gray-700 border-b-2 border-b-solid mb-12 w-[30vw] focus:outline-none text-[1.6rem]'/>
							<br/>
							<textarea id='message' placeholder='Message' required
									  className='resize-none bg-black border-b-gray-700 border-b-2 border-b-solid mb-4 w-[30vw] h-[35vh] focus:outline-none text-[1.6rem]'/>
							<br/>
							<input type='submit' name='send' value='Send'
								   className='text-[1.7rem] py-4 px-12 w-[10vw] hover:cursor-pointer hover:transition-all duration-500 hover:bg-[#0c0c0c] border-gray-700 border-2 border-solid rounded-2xl'/>
						</form>
					</div>
					:
					<div className='flex flex-col justify-center items-center text-center h-[90vh] max-h-[100vh] text-white bg-black text-gray-300'>
						<h1 className='text-[4rem]'>Successfully sent Contact request.</h1>
						<p className='text-[2rem]'>I'll get back to you as soon as possible.</p>
					</div>
				}
			</main>
			<Footer/>
		</>
	);
};

export default ContactForm;