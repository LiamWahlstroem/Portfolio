import React, {ReactElement} from 'react';
import Heading from '../Atoms/Heading';

type Props = {
	CollectionCardName: string;
	CollectionCardDate: string;
	collectionId: string;
	onClick: (value: React.MouseEvent<HTMLDivElement>) => void;
}

const CollectionCard = (props: Props): ReactElement => {
	return (
		<div
			className='w-11/12 md:basis-1/4 p-4 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 mx-auto md:mx-0 hover:cursor-pointer'
			data-id={props.collectionId}
			onClick={(ev) => props.onClick(ev)}
		>
			<Heading text={props.CollectionCardName}/>
			<p>{props.CollectionCardDate}</p>
		</div>
	);
};

export default CollectionCard;