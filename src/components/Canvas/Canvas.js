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

    const { pageNum, pages } = storyState;
    const index = pages[pageNum].paintingIndex;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (pages[pageNum].paintings.length === 0) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 400, 400);
            dispatchStory({ type: 'ADD_PAINTING', painting: canvas.toDataURL() })
        }

        let image = new Image();
        image.src = pages[pageNum].paintings[index];
        image.onload = () => ctx.drawImage(image, 0, 0);

    }, [pageNum, pages, index])

    const startPosition = () => {
        setPainting(true)
    }

    const endPosition = (e) => {
        if (painting) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            dispatchStory({ type: 'ADD_PAINTING', painting: canvas.toDataURL() })
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
        if (pages[pageNum].paintingIndex > 0) {
            dispatchStory({type: 'UNDO_PAINTING'});
        }
    }

    const redo = () => {
        if (pages[pageNum].paintingIndex < pages[pageNum].paintings.length) {
            dispatchStory({type: 'REDO_PAINTING'});
        }
    }

    const newPage = () => {
        dispatchStory({ type: 'ADD_PAGE' })
    }

    const nextPage = () => {
        if (pageNum < pages.length -1) 
            dispatchStory({ type: 'NEXT_PAGE' })
    }

    const prevPage = () => {
        if (pageNum > 0) 
        dispatchStory({ type: 'PREV_PAGE' })
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
            <button onClick={prevPage}>Previous Page</button>
            <button onClick={newPage}>Add a Page</button>
            <button onClick={nextPage}>Next Page</button>
            <h1>Page {storyState.pageNum + 1} of {storyState.pages.length}</h1>
        </div>
    )
}

export default Canvas;