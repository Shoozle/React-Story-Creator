import { getThemeProps } from "@material-ui/styles";
import { useContext, useEffect, useRef, useState } from "react";
import { StoryContext } from '../../App';
import classes from './storybook.module.css';

const Storybook = (props) => {

    
    const storyCtx = useContext(StoryContext);
    const {storyState, dispatchStory} = storyCtx;
    const firstCanvasRef = useRef(null);
    const secondCanvasRef = useRef(null);

    console.log(storyState);

    const [index, setIndex] = useState(0);
    const [firstPage, setFirstPage] = useState({});

    let secondPage;

    useEffect(() => {

        const firstPageCanvas = firstCanvasRef.current;
        const firstPageCtx = firstPageCanvas.getContext('2d');
        const imageSrc = storyState.pages[index].edits[storyState.pages[index].edits.length - 1];

        setFirstPage({
            imageSrc : imageSrc,
            text : storyState.pages[index].text
        })

        const image = new Image();
        image.src = imageSrc
        image.onload = () => firstPageCtx.drawImage(image, 0, 0);


    }, [index])


    return (
        <div onClick={props.onClose} className={classes.storybook}>
            <div className={classes.bookSection}>
                <div className={classes.page}>
                    <canvas width="400px" height="400px" ref={firstCanvasRef}/>
                    <p>{firstPage.text}</p>
                </div>
                <div className={classes.page}>
                    <canvas width="400px" height="400px" ref={secondCanvasRef}/>
                </div>
            </div>
        </div>
    )
}

export default Storybook;