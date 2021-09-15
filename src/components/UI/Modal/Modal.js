
import classes from './modal.module.css';

const Modal = (props) => {

    let className;

    if (props.show) {
        className = classes.modalOpen
    } else {
        className = classes.modalClosed
    }

    return (
        <div className={[classes.Modal, className].join(' ')}>
            {props.children}
        </div>
    )
}

export default Modal;