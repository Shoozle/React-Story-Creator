import classes from './backdrop.module.css';

const Backdrop = (props) => {



    return (
        <div className={classes.backdrop}>
            {props.children}
        </div>
    )
}

export default Backdrop;