import classes from './cursor.module.css';

const Cursor = (props) => {

    const { cursorStyle } = props;

    return (
        <div style={cursorStyle} className={classes.Cursor}>

        </div>
    )
}

export default Cursor