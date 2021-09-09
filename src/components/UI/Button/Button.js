import classes from './button.module.css';

const Button = (props) => {
    return (
        <button className={classes.Button} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;