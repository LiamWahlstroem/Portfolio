/** @type {DefaultColors} */

const colors = require('tailwindcss/colors');
const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

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
	plugins: [require('@tailwindcss/aspect-ratio'), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		':root': newVars,
	});
}