import classes from './toolbox.module.css';
import Button from '../../UI/Button/Button';

const Toolbox = (props) => {

    const { onUndo, onRedo, onFill, onPrevPage, onNewPage, onNextPage, brushSize, onBrushSizeChange } = props;

    let showBrushSizer;

    if (onBrushSizeChange) { 
        showBrushSizer = (
            <>
                <p>Brush Size: </p>
                <input type="range" value={brushSize} min="1" max="60" onChange={(e) => onBrushSizeChange(e)}></input>
        </>
        )
    }


    return (
        <div className={`${classes.Toolbox} ${props.placement === 'side' ? classes.side : classes.bottom}`}>
            { onUndo && <Button onClick={onUndo} text="Undo" />}
            { onFill && <Button onClick={onFill} text="Fill" />}
            { onRedo && <Button onClick={onRedo} text="Redo" />}
            { onPrevPage && <Button onClick={onPrevPage} text="Previous Page" />}
            { onNewPage && <Button onClick={onNewPage} text="Add a Page" />}
            { onNextPage && <Button onClick={onNextPage} text="Next Page" />}
            {showBrushSizer}
        </div>
    )
}

export default Toolbox;