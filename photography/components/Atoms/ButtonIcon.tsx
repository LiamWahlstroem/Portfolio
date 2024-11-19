import {ReactElement} from 'react';
import * as feather from 'feather-icons';

type Props = {
	icon: feather.FeatherIcon;
	handleClick: (value: boolean) => void
}

const ButtonIcon = (Props: Props): ReactElement => {
	const iconSVG = Props.icon.toSvg();

	return (
		<div className='hover:cursor-pointer' dangerouslySetInnerHTML={{__html: iconSVG}} onClick={() => Props.handleClick(false)}/>
	);
};

export default ButtonIcon;