import { useEffect, useReducer, useRef, useState } from 'react';
import storyReducer from '../../store/story';
import classes from './canvas.module.css'

const initialStoryState = {
    pages: [
        {
            description: '',
            editIndex: 0,
            edits: []
        }
    ]
};

const Canvas = (props) => {
    
    const canvasRef = useRef(null);
    const [painting, setPainting] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [storyState, dispatchStory] = useReducer(storyReducer, initialStoryState)

    const { pages } = storyState;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (pages[pageNum].edits.length === 0) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 400, 400);
            dispatchStory({ type: 'ADD_PAINTING', payload: { pageNum, edit: canvas.toDataURL() } })
        }

        const image = new Image();
        image.src = pages[pageNum].edits[pages[pageNum].editIndex -1];
        image.onload = () => ctx.drawImage(image, 0, 0);
        console.log('useEffect', pages, pageNum)

    }, [pages, pageNum])

    const startPosition = () => {
        setPainting(true)
    }

    const endPosition = (e) => {
        if (painting) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            dispatchStory({ type: 'ADD_PAINTING', payload: { pageNum, edit: canvas.toDataURL() } })
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
        if (pages[pageNum].editIndex > 0) {
            dispatchStory({type: 'UNDO_PAINTING', payload: { pageNum }});
        }
    }

    const redo = () => {
        if (pages[pageNum].editIndex < storyState.pages[pageNum].edits.length - 1) {
            dispatchStory({type: 'REDO_PAINTING', payload: { pageNum }});
        }
    }

    const newPage = () => {
        dispatchStory({ type: 'ADD_PAGE', payload: { pageNum } })
        setPageNum(pages.length)
    }

    const nextPage = () => {
        if (pageNum < pages.length -1)
            setPageNum((prevPageNum) => prevPageNum + 1)
    }

    const prevPage = () => {
        if (pageNum > 0) 
            setPageNum((prevPageNum) => prevPageNum - 1)
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
            <h1>Page {pageNum + 1} of {storyState.pages.length}</h1>
        </div>
    )
}

export default Canvas;