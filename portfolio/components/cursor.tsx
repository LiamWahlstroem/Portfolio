import {useEffect, useRef} from 'react';

const cursor = () => {
	const dot = useRef(null);
	const dotOutline = useRef(null);

	const delay = 18;

	const cursorVisible = useRef(true);
	const cursorEnlarged = useRef(false);

	const endX = useRef(window.innerWidth / 2);
	const endY = useRef(window.innerHeight / 2);
	const _x = useRef(0);
	const _y = useRef(0);

	const requestRef = useRef(null);

	const toggleCursorVisibility = () => {
		/*if(cursorVisible.current)
		{
			dot.current.style.opacity = 1;
			dotOutline.current.style.opacity = 1;
		}
		else {
			dot.current.style.opacity = 0;
			dotOutline.style.opacity = 0;
		}*/
	};

	const toggleCursorSize = () => {
		/*if(cursorEnlarged.current)
		{
			dot.current.style.transform = 'translate(-50%, -50%) scale(0.75)';
			dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
		}
		else
		{
			dot.current.style.transform = 'translate(-50%, -50%) scale(1)';
			dotOutline.current.style.transform = 'translate(-50%, -50%) scale(1)';
		}*/
	};

	const mouseOverEvent = () => {
		cursorEnlarged.current = true;
		toggleCursorSize();
	};

	const mouseOutEvent = () => {
		cursorEnlarged.current = false;
		toggleCursorSize();
	};

	const mouseEnterEvent = () => {
		cursorVisible.current = true;
		toggleCursorVisibility();
	};

	const mouseLeaveEvent = () =>
	{
		cursorVisible.current = false;
		toggleCursorVisibility();
	};

	const mouseMoveEvent = (e: any) => {
		cursorVisible.current = true;
		toggleCursorVisibility();

		endX.current = e.pageX;
		endY.current = e.pageY;

		dot.current.style.top = endY.current + 'px';
		dot.current.style.left = endX.current + 'px';
	};

	useEffect(() => {
		document.addEventListener('mousedown', mouseOverEvent);
		document.addEventListener('mouseup', mouseOutEvent);
		document.addEventListener('mousemove', mouseMoveEvent);
		document.addEventListener('mouseenter', mouseEnterEvent);
		document.addEventListener('mouseleave', mouseLeaveEvent);

		return () => {
			document.addEventListener('mousedown', mouseOverEvent);
			document.addEventListener('mouseup', mouseOutEvent);
			document.addEventListener('mousemove', mouseMoveEvent);
			document.addEventListener('mouseenter', mouseEnterEvent);
			document.addEventListener('mouseleave', mouseLeaveEvent);

			cancelAnimationFrame(requestRef.current);
		};
	}, []);

	return(
		<>
			<div ref={dotOutline} className='pointer-events-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] opacity-10 w-[40px] h-[40px] bg-red-500'></div>
			<div ref={dot} className='pointer-events-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] opacity-10'></div>
		</>
	);
};

export default cursor;