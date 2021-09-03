import classes from './toolbox.module.css';
import Button from '../../UI/Button/Button';

const Toolbox = (props) => {

    const { onUndo, onRedo, onPrevPage, onNewPage, onNextPage, brushSize, onBrushSizeChange } = props;

    let showBrushSizer;

    if (onBrushSizeChange) { 
        showBrushSizer = (
            <>
                <p>Brush Size: </p>
                <input type="range" value={brushSize} min="1" max="60" onChange={(e) => onBrushSizeChange(e)}></input>
        </>
        )
    }

    const myClass = [classes.Toolbox, props.placement].join(' ');

    return (
        <div className={myClass}>
            { onUndo && <Button onClick={onUndo} text="Undo" />}
            { onRedo && <Button onClick={onRedo} text="Redo" />}
            { onPrevPage && <Button onClick={onPrevPage} text="Previous Page" />}
            { onNextPage && <Button onClick={onNextPage} text="Next Page" />}
            { onNewPage && <Button onClick={onNewPage} text="Add a Page" />}
            {showBrushSizer}
        </div>
    )
}

export default Toolbox;