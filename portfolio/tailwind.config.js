/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js, jsx, ts, tsx}'
	],
	theme: {
		extend: {
			fontFamily: { sans: 'Bitter', norm: 'Roboto Condensed'}
		},
	},
	plugins: [],
};
