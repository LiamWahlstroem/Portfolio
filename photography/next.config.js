module.exports = {
	reactStrictMode: true,

	async headers() {
		return [
			{
				source: '/api/uploadImage',
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