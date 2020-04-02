import React from 'react';
import './Toolbox.css';

class Toolbox extends React.Component {
    constructor(props) {
        super(props);
        this.brushcolor = '#ff00ff';
        this.state = {
            background: '#ff00ff',
        };
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
        this.brushcolor = color.hex;
    };

    render() {
        return (
            <div className='toolbox'>
                <button onClick={() => this.undo()}>Undo</button>
                <button onClick={() => this.redo()}>Redo</button>
            </div>
        );
    }
}

export default Toolbox;