import Tag from '../../lib/Types/Tag';
import {ReactElement} from 'react';

type Props = {
    tag: Tag;
}

const FilterTag = (props: Props): ReactElement => {

	const handleSelect  = () => {
	};

	return (
		<div className='w-fit inline-block px-5 py-3 mx-4 my-2 rounded-full border-black border hover:bg-gray-300 hover:border-gray-300' onClick={handleSelect}>
			{props.tag.displayName}
		</div>
	);
};

export default FilterTag;