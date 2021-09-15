import classes from './backdrop.module.css';

const Backdrop = (props) => {

    let className;

    if (props.show) {
        className = classes.backdropOpen
    } else {
        className = classes.backdropClosed
    }

    return (
        <div className={[classes.backdrop, className].join(' ')}>
            {props.children}
        </div>
    )
}

export default Backdrop;