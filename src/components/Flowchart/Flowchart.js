import classes from './flowchart.module.css'
import { useContext, useState } from 'react';
import { StoryContext } from '../../App';
import Toolbox from '../Canvas/Toolbox/Toolbox';
import Storybook from '../Storybook/Storybook';

const Flowchart = (props) => {

    const storyContext = useContext(StoryContext);
    const { pages } = storyContext.storyState;
    const [storyDisplay, setStoryDisplay] = useState(null);

    const pageDivs = pages.map((process, index) => {
        return (
            <div
                key={index}
                className={classes.box}
                onClick={() => props.onPageChange(index)}
            >
                <span>{index + 1}</span>
            </div>
        )
    })

    

    const previewStory = () => {
        setStoryDisplay(<Storybook />)
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