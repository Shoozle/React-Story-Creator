import { useEffect, useState } from "react";
import classes from './storybook.module.css';

const Storybook = () => {

    const [pagesDisplay, setPagesDisplay] = useState(1);

    const setPagesToDisplay = () => {
        if (window.outerWidth < 800) {
            setPagesDisplay(1)
        } else {
            setPagesDisplay(2)
        }
        console.log(pagesDisplay)
    }

    useEffect(() => {
        document.addEventListener('resize', setPagesToDisplay)
    }, [])

    return (
        <div className={classes.storyBook}>
            <h1>HELLO</h1>
        </div>
    )
}

export default Storybook;