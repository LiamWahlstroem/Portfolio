type Props = {
	inputValue: (value: string) => void;
}

const TextInputPassword = (Props: Props) => {
	return (
		<input type='password' placeholder='Password' onChange={(ev) => Props.inputValue(ev.currentTarget.value)} className='w-60 text-lg mx-8 my-4 border-b border-black hover:bg-gray-100 transition-all focus:outline-none'/>
	);
};

export default TextInputPassword;