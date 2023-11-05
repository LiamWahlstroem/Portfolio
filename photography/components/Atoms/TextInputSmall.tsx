type Props = {
	placeholder: string;
	inputValue: (value: string) => void;
	defaultValue: string | undefined;
}

const TextInputSmall = (Props: Props) => {
	return (
		<div className='my-4 mx-8 flex flex-col'>
			<input type='text' defaultValue={Props.defaultValue} placeholder={Props.placeholder} onChange={(ev) => Props.inputValue(ev.currentTarget.value)} className='w-60 text-lg border-b border-black hover:bg-gray-100 transition-all focus:outline-none'/>
			<label className='text-sm text-gray-500'>
				<i>{Props.placeholder}</i>
			</label>
		</div>
	);
};

export default TextInputSmall;