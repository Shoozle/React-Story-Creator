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

            </div>
        );
    }
}

export default Toolbox;