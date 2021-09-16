import { useContext, useEffect, useRef, useState } from "react";
import { StoryContext } from '../../App';
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
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
    const [hideSecondPage, setHideSecondPage] = useState(false);

    useEffect(() => {

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

        try {
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
            setHideSecondPage(false);
        } catch (err) {
            setHideSecondPage(true);
        }
    }, [index, storyState.pages, hideSecondPage])


    let firstPageDisplay;
    let secondPageDisplay;

    firstPageDisplay = (
        <div className={classes.page}>
            <canvas width="400px" height="400px" ref={firstCanvasRef} className={classes.canvas} />
            <p>{firstPage.text || 'Please enter some text for this page'}</p>

        </div>
    )

    secondPageDisplay = (
        <div className={classes.page}>
            <canvas width="400px" height="400px" ref={secondCanvasRef} className={classes.canvas} />
            <p>{secondPage.text || 'Please enter some text for this page'}</p>
        </div>
    )

    const nextPage = () => {
            setIndex(index + 2)
    }

    const prevPage = () => {
            setIndex(index - 2)
            setHideSecondPage(false)
    }

    return (
        <Backdrop>
            <Modal show={true}>
                <div className={classes.bookSection}>
                    <h1 className={classes.storyTitle}>{storyState.title || 'Please enter a title for your story'}</h1>
                    <div className={classes.pageArea}>
                        {firstPageDisplay}
                        {!hideSecondPage && secondPageDisplay}
                    </div>
                    <div className={classes.buttonArea}>
                        {index >= 2 && <Button text="Previous Page" onClick={prevPage}></Button>}
                        <Button text="Close" onClick={props.onClose} />
                        {index < storyState.pages.length - 2 && <Button text="Next Page" onClick={nextPage}></Button>}
                    </div>
                </div>
            </Modal>
        </Backdrop>
    )
}

export default Storybook;