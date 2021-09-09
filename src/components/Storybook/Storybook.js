import { useContext, useEffect, useRef, useState } from "react";
import { StoryContext } from '../../App';
import Button from '../UI/Button/Button';

import classes from './storybook.module.css';

const Storybook = (props) => {

    const storyContext = useContext(StoryContext);
    const { storyState, dispatchStory } = storyContext;
    const firstCanvasRef = useRef(null);
    const secondCanvasRef = useRef(null);

    const [index, setIndex] = useState(0);
    const [firstPage, setFirstPage] = useState({});
    const [secondPage, setSecondPage] = useState({});

    const [err, setErr] = useState(false);

    useEffect(() => { 
        try {
            const firstPageCanvas = firstCanvasRef.current;
            const firstPageCtx = firstPageCanvas.getContext('2d');
            const firstimageSrc = storyState.pages[index].edits[storyState.pages[index].edits.length - 1];
    
            setFirstPage({
                imageSrc: firstimageSrc,
                text: storyState.pages[index].text
            })
    
            const firstImage = new Image();
            firstImage.src = firstimageSrc
            firstImage.onload = () => firstPageCtx.drawImage(firstImage, 0, 0);

            const secondPageCanvas = secondCanvasRef.current;
            const secondPageCtx = secondPageCanvas.getContext('2d');
            const secondimageSrc = storyState.pages[index + 1].edits[storyState.pages[index + 1].edits.length - 1];

            setSecondPage({
                imageSrc: secondimageSrc,
                text: storyState.pages[index + 1].text
            })

            const secondImage = new Image();
            secondImage.src = secondimageSrc
            secondImage.onload = () => secondPageCtx.drawImage(secondImage, 0, 0);

            setErr(false)
        } catch (err) {
            setErr(true)
        }

    }, [index, err])

    
    let firstPageDisplay;
    let secondPageDisplay;

    firstPageDisplay = (
        <div className={classes.page}>
            <canvas width="400px" height="400px" ref={firstCanvasRef} className={classes.canvas} />
            <p>{firstPage.text}</p>

        </div>
    )

    secondPageDisplay = (
        <div className={classes.page}>
            <canvas width="400px" height="400px" ref={secondCanvasRef} className={classes.canvas} />
            <p>{secondPage.text}</p>
        </div>
    )

    console.log(err)

    const nextPage = () => {
        if (index < storyState.pages.length -1)
            setIndex(index + 2)
    }

    const prevPage = () => {
        if (index >= 2)
            setIndex(index - 2)
    }

    return (
        <div className={classes.storybook}>

            <div className={classes.bookSection}>
                <h1 className={classes.storyTitle}>{storyState.title}</h1>
                <div className={classes.pageArea}>
                    {firstPageDisplay}
                    {!err && secondPageDisplay}
                </div>

                <div className={classes.buttonArea}>
                    <Button text="Previous Page" onClick={prevPage}></Button>
                    <Button text="Close" onClick={props.onClose} />
                    <Button text="Next Page" onClick={nextPage}></Button>
                </div>
            </div>
        </div>
    )
}

export default Storybook;