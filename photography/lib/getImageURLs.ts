const getImageURLs = async (): Promise<string[]> => {
	const URL = '/api/getImages';
	let imageURLs: string[] = [];

	fetch(URL, {
		method: 'GET',
	}).then(r => {
		if (r.status === 200) {
			return r.json();
		}
	}).then((data: any) => imageURLs = data.imageURLs);
	return imageURLs;
};

export default getImageURLs;