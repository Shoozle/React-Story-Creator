import classes from './flowchart.module.css'
import { useContext } from 'react';
import { StoryContext } from '../../App';



const Flowchart = () => {

    const storyContext = useContext(StoryContext);
    const { pages } = storyContext.storyState;

    const pageDivs = pages.map((process, index) => {
        return (
        <div>
            <p>{index}</p>
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