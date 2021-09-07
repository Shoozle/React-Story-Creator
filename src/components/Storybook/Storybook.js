import { useContext, useEffect, useRef, useState } from "react";
import { StoryContext } from '../../App';
import Button from '../UI/Button/Button';

import classes from './storybook.module.css';

const Storybook = (props) => {

    
    const storyCtx = useContext(StoryContext);
    const {storyState, dispatchStory} = storyCtx;
    const firstCanvasRef = useRef(null);
    const secondCanvasRef = useRef(null);

    console.log(storyState);

    const [index, setIndex] = useState(0);
    const [firstPage, setFirstPage] = useState({});
    const [secondPage, setSecondPage] = useState({});

    useEffect(() => {

        const firstPageCanvas = firstCanvasRef.current;
        const firstPageCtx = firstPageCanvas.getContext('2d');
        const firstimageSrc = storyState.pages[index].edits[storyState.pages[index].edits.length - 1];

        // const secondPageCanvas = secondCanvasRef.current;
        // const secondPageCtx = secondPageCanvas.getContext('2d');
        // const secondimageSrc = storyState.pages[index + 1].edits[storyState.pages[index].edits.length - 1];

        setFirstPage({
            imageSrc : firstimageSrc,
            text : storyState.pages[index].text
        })

        // setSecondPage({
        //     imageSrc : secondimageSrc,
        //     text : storyState.pages[index].text
        // })

        const firstImage = new Image();
        firstImage.src = firstimageSrc
        firstImage.onload = () => firstPageCtx.drawImage(firstImage, 0, 0);

        // const secondImage = new Image();
        // secondImage.src = secondimageSrc
        // secondImage.onload = () => secondPageCtx.drawImage(secondImage, 0, 0);


    }, [index])


    return (
        <div onClick={props.onClose} className={classes.storybook}>
            <h1>{storyState.title}</h1>
            <div className={classes.bookSection}>
                <div className={classes.page}>
                    <canvas width="400px" height="400px" ref={firstCanvasRef}/>
                    <p>{firstPage.text}</p>
                    <Button text="Previous Page"></Button>
                </div>
                <div className={classes.page}>
                    <canvas width="400px" height="400px" ref={secondCanvasRef}/>
                </div>
            </div>
        </div>
    )
}

export default Storybook;