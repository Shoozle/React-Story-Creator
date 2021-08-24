import { useEffect, useReducer, useRef, useState } from 'react';
import { indexReducer } from '../../store/story';
import classes from './canvas.module.css'

const Canvas = (props) => {

    const canvasRef = useRef(null);
    const [painting, setPainting] = useState(false);
    const [drawings, setDrawings] = useState([]);
    const [state, dispatch] = useReducer(indexReducer, {index: 0})

    const { index } = state;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (drawings.length === 0) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 400, 400);
            const oldDrawings = [...drawings]
            oldDrawings.push(canvas.toDataURL())
            setDrawings(oldDrawings)
        }
        
        let image = new Image();
        image.src = drawings[index];
        image.onload = () => ctx.drawImage(image, 0, 0);
        console.log(index);

    }, [index])

    // console.log(state.index)

    const startPosition = () => {
        setPainting(true)
    }

    const endPosition = (e) => {
        if (painting) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            const oldDrawings = [...drawings]
            oldDrawings.push(canvas.toDataURL())
            setDrawings(oldDrawings)
            dispatch({type: 'increment'})
        }
        setPainting(false);
    }

    const draw = (canvas, location) => {
        const ctx = canvas.getContext('2d');
        const { x, y } = location;

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

    const undo = () => {
        if (index > 0) {
            dispatch({type: 'decrement'});
        }
    }

    const redo = () => {
        if (index < drawings.length - 1) {
            dispatch({type: 'increment'});
        }
    }



    return (
        <div className={classes.Canvas}>
            <canvas
                width="400px" height="400px"
                ref={canvasRef}
                id="drawing-canvas"
                onMouseDown={startPosition}
                onMouseMove={e => {
                    const canvas = canvasRef.current;
                    draw(canvas, { x: e.clientX, y: e.clientY })
                }}
                onMouseUp={endPosition}
                onMouseLeave={endPosition}
            />
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
        </div>
    )
}

export default Canvas;