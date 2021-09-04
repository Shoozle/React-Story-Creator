import classes from './toolbox.module.css';
import './brush.css';
import Button from '../../UI/Button/Button';
import { HexColorPicker } from 'react-colorful';

const Toolbox = (props) => {

    const { onUndo, onRedo, onFill, onPrevPage, onNewPage, onNextPage, brushSize, onBrushSizeChange, color, setColor } = props;

    let brushControls;

    if (onBrushSizeChange) {
        brushControls = (
            <>
                <label htmlFor="size">Brush Size</label>
                <input type="range" id="size" value={brushSize} min="1" max="60" onChange={(e) => onBrushSizeChange(e)}></input>
                <HexColorPicker className={classes.colorful} color={color} onChange={setColor} />
            </>
        )
    }

    return (
        <div className={`${classes.Toolbox} ${props.placement === 'side' ? classes.side : classes.bottom}`}>
            {onUndo && <Button onClick={onUndo} text="Undo" />}
            {onFill && <Button onClick={onFill} text="Fill" />}
            {onRedo && <Button onClick={onRedo} text="Redo" />}
            {onPrevPage && <Button onClick={onPrevPage} text="Previous Page" />}
            {onNewPage && <Button onClick={onNewPage} text="Add a Page" />}
            {onNextPage && <Button onClick={onNextPage} text="Next Page" />}
            {brushControls}
        </div>
    )
}

export default Toolbox;