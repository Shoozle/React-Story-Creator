import { useContext, useEffect, useRef, useState } from "react";
import { StoryContext } from '../../App';
import Button from '../UI/Button/Button';

import classes from './storybook.module.css';

const Storybook = (props) => {

    const storyContext = useContext(StoryContext);
    const { storyState } = storyContext;
    const firstCanvasRef = useRef(null);
    const secondCanvasRef = useRef(null);

    const [index, setIndex] = useState(0);
    const [firstPage, setFirstPage] = useState({});
    const [secondPage, setSecondPage] = useState({});

    const [displaySecondPage, setDisplaySecondPage] = useState(false);
    const [displayTwoPages, setDisplayTwoPages] = useState(true)

    useEffect(() => {

        if (storyState.pages.length === 1) {
            setDisplaySecondPage(false)
        } else {
            setDisplaySecondPage(true)
        }

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

        if (displaySecondPage) {
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
        }


    }, [index])


    let firstPageDisplay;
    let secondPageDisplay;

    firstPageDisplay = (
        <div className={classes.page}>
            <canvas width="400px" height="400px" ref={firstCanvasRef} className={classes.canvas} />
            <p>{firstPage.text}</p>

        </div>
    )

    if (displaySecondPage) {
        secondPageDisplay = (
            <div className={classes.page}>
                <canvas width="400px" height="400px" ref={secondCanvasRef} className={classes.canvas} />
                <p>{secondPage.text}</p>
            </div>
        )
    } else {
        secondPageDisplay = null;
    }

    const nextPage = () => {
        if (index < storyState.pages.length - 1)
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
                    {displaySecondPage && secondPageDisplay}
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