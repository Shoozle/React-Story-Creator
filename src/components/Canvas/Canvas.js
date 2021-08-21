import { useEffect, useRef, useState } from 'react';
import classes from './canvas.module.css'

const Canvas = (props) => {

    const canvasRef = useRef(null);

    const [painting, setPainting] = useState(false);

    useEffect(() => {

    }, [])

    const startPosition = () => {
        setPainting(true)  
    }

    const endPosition = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        setPainting(false)
    }

    const draw = (canvas, location) => {
        const ctx = canvas.getContext('2d');
        const {x, y} = location;
        
        if (!painting) return;

        let offsetLeft = canvas.offsetLeft - window.scrollX;
        let offsetTop = canvas.offsetTop - window.scrollY;
        ctx.lineWidth = 20;
        ctx.lineCap = "round";
        ctx.strokeStyle = 'black';
        ctx.lineTo(x - offsetLeft, y - offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - offsetLeft, y - offsetTop);
    }


    return (
        <div className={classes.Canvas}>
            <canvas
                width="1000px" height="1000px"
                ref={canvasRef} 
                id="drawing-canvas"
                onMouseDown={startPosition} 
                onMouseMove={e => {
                    const canvas = canvasRef.current;
                    draw(canvas, {x: e.clientX, y: e.clientY})
                }}
                onMouseUp={endPosition}
                onMouseLeave={endPosition}
            />
        </div>
    )
}

export default Canvas;