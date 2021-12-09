import classes from './flowchart.module.css'
import { useContext, useState } from 'react';
import { StoryContext } from '../../App';
import Toolbox from '../Canvas/Toolbox/Toolbox';
import Storybook from '../Storybook/Storybook';
import Button, { FlowchartButton } from '../UI/Button/Button';

const Flowchart = (props) => {

    const storyContext = useContext(StoryContext);
    const { pages } = storyContext.storyState;
    const [storyDisplay, setStoryDisplay] = useState(null);

    const pageDivs = pages.map((process, index) => {
        const text = `Page ${index + 1}`
        return (
            <FlowchartButton
                key={index}
                onClick={() => props.onPageChange(index)}>
                <span>{text}</span>
            </FlowchartButton>
        )
    })

    const closeStoryHandler = () => {
        setStoryDisplay(null);
    }

    const previewStory = () => {
        setStoryDisplay(<Storybook onClose={closeStoryHandler}/>)
    }

    return (
        <div className={classes.Flowchartarea}>
            <div className={classes.Flowchart}>
                {pageDivs}
            </div>
            {storyDisplay}
            <Toolbox 
                onPreview={previewStory}
            />
        </div>
    )
}

export default Flowchart