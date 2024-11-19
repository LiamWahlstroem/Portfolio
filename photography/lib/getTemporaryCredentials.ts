const getTemporaryCredentials = async (token: string) => {
	const result = await fetch('/api/getAWSCredentials', {
		method: 'GET',
		headers: {
			authorization: token,
			'Content-Type': 'application/json'
		},
	});

	return result;
};

export default getTemporaryCredentials;