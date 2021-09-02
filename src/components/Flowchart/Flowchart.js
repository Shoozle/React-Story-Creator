import classes from './flowchart.module.css'
import { useContext } from 'react';
import { StoryContext } from '../../App';

const Flowchart = (props) => {

    const storyContext = useContext(StoryContext);
    const { pages } = storyContext.storyState;

    const pageDivs = pages.map((process, index) => {
        console.log(index)
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

    return (
        <div className={classes.Flowchart}>
            {pageDivs}
        </div>
    )
}

export default Flowchart