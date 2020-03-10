import React from 'react';
import { ChromePicker } from 'react-color';
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
            <div className='toolbox' color={this.brushcolor}>
                <ChromePicker
                    color={this.state.background}
                    onChange={this.handleChangeComplete}
                />
                <h1>{this.props.brushcolor}</h1>
            </div>
        );
    }
}

export default Toolbox;