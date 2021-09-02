import Button from '../../UI/Button/Button';

const Toolbox = (props) => {

    const { onUndo, onRedo, onPrevPage, onNewPage, onNextPage } = props;

    return (
        <div>
            <Button onClick={onUndo} text="Undo" />
            <Button onClick={onRedo} text="Redo" />
            <Button onClick={onPrevPage} text="Previous Page" />
            <Button onClick={onNewPage} text="Add a Page" />
            <Button onClick={onNextPage} text="Next Page" />
        </div>
    )
}

export default Toolbox;