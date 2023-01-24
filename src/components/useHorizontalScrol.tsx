import {MouseEvent, useEffect, useRef, useState} from "react";

export function useHorizontalScroll() {
    const [isMove, setIsMove] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);

    const containerRef: {current: HTMLElement | null} | null = useRef(null);

    useEffect(() => {
        const container = containerRef.current!;

        const handleMouseDown = (e: any): void => {
            e.preventDefault();
            setIsDown(true);
            setStartX(e.clientX);
        }

        const handleMouseClick= (e: Event): void => {
            if (isMove && isDown)
            {e.preventDefault()};
            setIsMove(false);
            setIsDown(false);
            //containerRef.current.scrollLeft=0
        }

        const handleMouseMove = (e: any): void => {
            //console.log(isMove,isDown)
            if(!isDown) return
            setIsMove(true);
            const currentX = e.clientX;
            const xDiff = startX - currentX;

            containerRef.current!.scrollLeft += xDiff;
            setStartX(currentX);
        }

        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('click', handleMouseClick);
        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('click', handleMouseClick);
            container.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isDown, isMove, startX]);

    return  containerRef;
}