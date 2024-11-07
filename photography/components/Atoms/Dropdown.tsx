import {CollectionResponse} from '../../lib/Types/CollectionType';

type Props = {
	name: string;
	inputValue: (value: string) => void;
	collections: CollectionResponse[];
}

const Dropdown = (Props: Props) => {
	return (
		<div className='my-4 mx-8 flex flex-col'>
			<select onChange={(ev) => Props.inputValue(ev.currentTarget.value)} className='w-60 text-lg border-b border-black hover:bg-gray-100 transition-all focus:outline-none'>
				{Props.collections.map((collection: CollectionResponse, index: number) => <option value={collection._id} key={index}>{collection.collectionName}</option>)}
			</select>
			<label className='text-sm text-gray-500'>
				<i>{Props.name}</i>
			</label>
		</div>
	);
};

export default Dropdown;