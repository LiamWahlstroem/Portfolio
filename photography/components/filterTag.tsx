import Tag from '../lib/Types/Tag';

type Props = {
    tag: Tag;
    customClickEvent: any;
}

const FilterTag = (props: Props) => {
	let selected: boolean;

	const handleSelect  = () => {
		props.customClickEvent(props.tag);
	};

	return (
		<div className='w-fit inline-block px-5 py-3 mx-4 my-2 rounded-full border-black border hover:bg-gray-300 hover:border-gray-300' onClick={handleSelect}>
			{props.tag.displayName}
		</div>
	);
};

export default FilterTag;