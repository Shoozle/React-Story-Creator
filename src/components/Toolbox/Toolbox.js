import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

class Toolbox extends Component {
    constructor() {
        super();
        this.state = {
            color: '000',
        }
    }

    render() {
        return (
            <div>
                <ChromePicker />
            </div>
        );
    }
}

export default Toolbox;