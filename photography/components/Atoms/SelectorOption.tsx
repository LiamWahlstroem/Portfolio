import React from 'react';

type Props = {
	text: string;
	value: string;
}

const SelectorOption = (Props: Props) => {
	return (
		<option value={Props.value}>{Props.text}</option>
	);
};

export default SelectorOption;