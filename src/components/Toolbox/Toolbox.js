import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

class Toolbox extends Component {
        state = {
            brushColor: '#fff',
        };

    handleChangeComplete = (color) => {
        this.setState({ brushColor: color.hex });
    };

    render() {
        return (
            <div>
                <ChromePicker 
                color={ this.state.brushColor }
                onChange={ this.handleChangeComplete }/>
            </div>
        );
    }
}

export default Toolbox;