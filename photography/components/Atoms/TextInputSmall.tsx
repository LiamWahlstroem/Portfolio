type Props = {
	placeholder: string;
	inputValue: (value: string) => void;
	defaultValue: string | undefined;
}

const TextInputSmall = (Props: Props) => {
	return (
		<input type='text' defaultValue={Props.defaultValue} placeholder={Props.placeholder} onChange={(ev) => Props.inputValue(ev.currentTarget.value)} className='w-60 text-lg mx-8 my-4 border-b border-black hover:bg-gray-100 transition-all focus:outline-none'/>
	);
};

export default TextInputSmall;