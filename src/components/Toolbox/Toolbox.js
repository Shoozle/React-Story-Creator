import React from 'react';
import { ChromePicker } from 'react-color';

const Toolbox = ({onChangeBrushColour}) => {
    return (
        <div>
            <ChromePicker
            onChangeComplete={onChangeBrushColour} />
        </div>
    );
}

export default Toolbox;