import classes from './toolbox.module.css';
import './brush.css';
import Button from '../../UI/Button/Button';
import { HexColorPicker } from 'react-colorful';
import { StoryContext } from '../../../App';
import { useContext } from 'react';

const Toolbox = (props) => {

    const { onUndo, onRedo, onFill, onPrevPage, onNewPage, onNextPage, brushSize, onBrushSizeChange, color, setColor, onPreview, pageNum } = props;

    const storyContext = useContext(StoryContext);
    const { pages } = storyContext.storyState;

    let brushControls;

    if (onBrushSizeChange) {
        brushControls = (
            <>
                <fieldset>
                <label htmlFor="size">Brush Size</label>
                <input type="range" id="size" value={brushSize} min="1" max="60" onChange={(e) => onBrushSizeChange(e)}></input>
                </fieldset>

                <HexColorPicker className={classes.colorful} color={color} onChange={setColor} />
            </>
        )
    }

    return (
        <div className={`${classes.Toolbox} ${props.placement === 'side' ? classes.side : classes.bottom}`}>
                {onUndo && <Button onClick={onUndo} text="Undo" />}
                {onFill && <Button onClick={onFill} text="Fill" />}
                {onRedo && <Button onClick={onRedo} text="Redo" />}
                {brushControls}

            {pageNum > 0 && <Button onClick={onPrevPage} text="Previous Page" />}
            {pages.length < 20 && onNewPage && <Button onClick={onNewPage} text="Add a Page" />}
            {pages.length > 1 && pageNum < pages.length-1 && <Button onClick={onNextPage} text="Next Page" />}
            {onPreview && <Button onClick={onPreview} text="Preview Story" />}

        </div>
    )
}

export default Toolbox;