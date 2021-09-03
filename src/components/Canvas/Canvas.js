import { useContext, useEffect, useRef, useState } from 'react';
import { StoryContext } from '../../App';
import classes from './canvas.module.css'
import Toolbox from './Toolbox/Toolbox';


const Canvas = (props) => {

    const canvasRef = useRef(null);
    const textRef = useRef(null);
    const [painting, setPainting] = useState(false);
    const storyContext = useContext(StoryContext);
    const { pages } = storyContext.storyState;
    const { pageNum } = props;
    const maxPages = 20;
    const [brushSize, setBrushSize] = useState(20);

    useEffect(() => {
        const canvas = canvasRef.current;
        const storyText = textRef.current;
        const ctx = canvas.getContext('2d');

        if (pages[pageNum].edits.length === 0) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 400, 400);
            storyContext.dispatchStory({ type: 'ADD_PAINTING', payload: { pageNum, edit: canvas.toDataURL() } })
        }

        const image = new Image();
        image.src = pages[pageNum].edits[pages[pageNum].editIndex - 1];
        image.onload = () => ctx.drawImage(image, 0, 0);

        if (pages[pageNum].text === undefined || null) {
            storyText.value = '';
        }
        storyText.value = pages[pageNum].text;

    }, [pages, pageNum])

    const startPosition = () => {
        setPainting(true)
    }

    const endPosition = (e) => {
        if (painting) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            storyContext.dispatchStory({ type: 'ADD_PAINTING', payload: { pageNum, edit: canvas.toDataURL() } })
        }
        setPainting(false);
    }

    const draw = (canvas, location) => {
        const ctx = canvas.getContext('2d');
        const { x, y } = location;

        if (!painting) return;

        let offsetLeft = canvas.offsetLeft - window.scrollX;
        let offsetTop = canvas.offsetTop - window.scrollY;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = 'black';
        ctx.lineTo(x - offsetLeft, y - offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - offsetLeft, y - offsetTop);
    }

    const undo = () => {
        if (pages[pageNum].editIndex > 1) {
            storyContext.dispatchStory({ type: 'UNDO_PAINTING', payload: { pageNum } });
        }
    }

    const redo = () => {
        if (pages[pageNum].editIndex < storyContext.storyState.pages[pageNum].edits.length) {
            storyContext.dispatchStory({ type: 'REDO_PAINTING', payload: { pageNum } });
        }
    }

    const fill = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,400,400);
        storyContext.dispatchStory({ type: 'ADD_PAINTING', payload: { pageNum, edit: canvas.toDataURL() } })    
    }

    const newPage = () => {
        if (pages.length < maxPages) {
            storyContext.dispatchStory({ type: 'ADD_PAGE', payload: { pageNum } })
            props.onPageChange(pages.length)
        }
    }

    const nextPage = () => {
        if (pageNum < pages.length - 1) {
            props.onPageChange((prevPageNum) => prevPageNum + 1)

        }
    }

    const prevPage = () => {
        if (pageNum > 0) {
            props.onPageChange((prevPageNum) => prevPageNum - 1)
        }
    }

    const changeBrushSize = (e) => {
        setBrushSize(e.target.value)
    }

    const onUpdateStoryText = (e) => {
        const text = e.target.value;
        storyContext.dispatchStory({ type: 'UPDATE_TEXT', payload: { pageNum, text } })
    }

    return (
        <div>
            <h1 className={classes.pageNumber}>Page {pageNum + 1} of {storyContext.storyState.pages.length}</h1>
            <div className={classes.drawingArea}>
                <div className={classes.drawingButtons}>
                    <Toolbox
                        onUndo={undo}
                        onRedo={redo}
                        onFill={fill}
                        onBrushSizeChange={changeBrushSize}
                        brushSize={brushSize}
                        placement="side"
                    />
                </div>
                <div className={classes.storyArea}>
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
                    <div className={classes.pageButtons}>
                        <Toolbox
                            onPrevPage={prevPage}
                            onNewPage={newPage}
                            onNextPage={nextPage}
                            placement="bottom"
                        />
                    </div>
                    <textarea
                        ref={textRef}
                        type="textarea"
                        col="30"
                        row="12"
                        maxLength="200"
                        placeholder="Page writing"
                        onChange={onUpdateStoryText}
                    />
                </div>
            </div>
        </div>

    )
}

export default Canvas;