
import { useContext, useState } from "react";
import { StoryContext } from "../../../App";
import classes from './title.module.css'

const Title = () => {

    const maxLength = 80;
    const [title, setTitle] = useState('');
    const storyContext = useContext(StoryContext);

    const onChangeHandler = (e) => {
        setTitle(e.target.value)
        storyContext.dispatchStory({type: 'UPDATE_TITLE', payload: {title}})
    }

    return (
        <input 
            placeholder="Story title"
            value={title} 
            onChange={onChangeHandler} 
            maxLength={maxLength} 
            className={classes.Title}

            />
    )

}

export default Title