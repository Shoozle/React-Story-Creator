import { useEffect, useRef, useState } from 'react';
import classes from './canvas.module.css'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    useEffect(() => {

    }, [])

    const startPosition = (e) => {
        draw(e);    
    }

    const endPosition = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
    }

    const draw = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let offsetLeft = canvas.offsetLeft - window.scrollX;
        let offsetTop = canvas.offsetTop - window.scrollY;
        ctx.lineWidth = 20;
        ctx.lineCap = "round";
        ctx.strokeStyle = 'black';
        ctx.lineTo(e.clientX - offsetLeft, e.clientY - offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - offsetLeft, e.clientY - offsetTop);
    }


    return (
        <div className={classes.Canvas}>
            <canvas
                width="1000px" height="1000px"
                ref={canvasRef} 
                id="drawing-canvas"
                onMouseDown={e => startPosition(e)} 
                onMouseMove={e => draw(e)}
                onMouseUp={endPosition}
            />
        </div>
    )
}

export default Canvas;