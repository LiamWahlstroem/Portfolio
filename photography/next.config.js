module.exports = {
	reactStrictMode: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},

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