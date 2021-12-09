import classes from './button.module.css';

export const Button = (props) => {
    return (
        <button className={classes.Button} onClick={props.onClick}>{props.text}</button>
    )
}

export const FlowchartButton = (props) => {
    return (
        <button className={classes.FlowchartButton} onClick={props.onClick}>{props.children}</button>
    ) 
}

export default Button;