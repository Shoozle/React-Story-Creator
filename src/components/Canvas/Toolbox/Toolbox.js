import Button from '../../UI/Button/Button';

const Toolbox = (props) => {

    const { onUndo, onRedo, onPrevPage, onNewPage, onNextPage, brushSize, onBrushSizeChange } = props;

    return (
        <div>
            <Button onClick={onUndo} text="Undo" />
            <Button onClick={onRedo} text="Redo" />
            <Button onClick={onPrevPage} text="Previous Page" />
            <Button onClick={onNewPage} text="Add a Page" />
            <Button onClick={onNextPage} text="Next Page" />
            <input type="range" value={brushSize} min="1" max="60" onChange={(e) => onBrushSizeChange(e)}></input>
        </div>
    )
}

export default Toolbox;