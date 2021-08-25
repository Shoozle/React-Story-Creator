import { useEffect, useReducer, useRef, useState } from 'react';
import storyReducer from '../../store/story';
import classes from './canvas.module.css'

const initialStoryState = {
        pageNum: 0,
        pages: [
            {
                description: '',
                paintingIndex: 0,
                paintings: []
            }
        ]
};

const Canvas = (props) => {
    
    const canvasRef = useRef(null);
    const [painting, setPainting] = useState(false);

    //State is always most uptodate state
    const [storyState, dispatchStory] = useReducer(storyReducer, initialStoryState)

    //Storyreducer is the function that returns a new updated state based on prevstate and action done (prevState, action)

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // if (story.length === 0) {
        //     ctx.fillStyle = 'white';
        //     ctx.fillRect(0, 0, 400, 400);
        //     const oldDrawings = [...story[]]
        //     oldDrawings.push(canvas.toDataURL())
        //     setDrawings(oldDrawings)
        // }

        // let image = new Image();
        // image.src = drawings[0];
        // image.onload = () => ctx.drawImage(image, 0, 0);

        console.log(storyState.pages);

    }, [storyState])

    const startPosition = () => {
        setPainting(true)
    }

    const endPosition = (e) => {
        if (painting) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            // const oldDrawings = [...drawings]
            // oldDrawings.push(canvas.toDataURL())
            // setDrawings(oldDrawings)
            dispatchStory({ type: 'ADD_PAGE' })
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
        // if (index > 0) {
        //     dispatch({type: 'decrement'});
        // }
    }

    const redo = () => {
        // if (index < drawings.length - 1) {
        //     dispatch({type: 'increment'});
        // }
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