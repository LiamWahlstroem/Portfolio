type Props = {
	inputValue: (value: string) => void;
}

const TextInputPassword = (Props: Props) => {
	return (
		<div className='my-4 mx-8 flex flex-col'>
			<input type='password' placeholder='Password' required onChange={(ev) => Props.inputValue(ev.currentTarget.value)} className='w-60 text-lg border-b border-black hover:bg-gray-100 transition-all focus:outline-none'/>
			<label className='text-sm text-gray-500'>
				<i>Password</i>
			</label>
		</div>
	);
};

export default TextInputPassword;