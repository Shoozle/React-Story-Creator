import { useEffect, useRef } from "react";
import classes from './cursor.module.css';

const Cursor = (props) => {

    const { painting, finishedPosition, brushSize, color, inCanvas } = props;
    const cursorRef = useRef(null)

    useEffect(() => {
        if (inCanvas) {
            console.log('hello');
        }
    }, [])

    const updateCursor = (e) => {
        cursorRef.current.setAttribute("style", `top: ${e.pageY - brushSize / 2}px; 
            left: ${e.pageX - brushSize / 2}px;
            height: ${brushSize}px;
            width: ${brushSize}px;
            border: 1px solid ${color}}`);
    }

    const toggleCursor = () => {
        if (cursorRef.current.style.display === "none") {
            cursorRef.current.style.display = "block";
        } else {
            cursorRef.current.style.display = "none";
        }
        if (painting) {
            finishedPosition();
        }
    }

    return (
        <div ref={cursorRef} className={classes.Cursor}>

        </div>
    )
}

export default Cursor