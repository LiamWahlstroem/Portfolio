import {ImageResponse} from './ImageType';

export type CollectionResponse = {
	_id: string,
	collectionName: string,
	collectionDate: string,
}

export type CollectionImages = {
	collection: CollectionResponse;
	images: ImageResponse[];
}