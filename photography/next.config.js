module.exports = {
	reactStrictMode: true,

	async headers() {
		return [
			{
				source: '/api/uploadImageFiles',
				headers: [
					{
						key: 'content-type',
						value: 'multipart/form-data',
					},
				],
			},
		];
	},
};