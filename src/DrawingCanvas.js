import React from 'react';
import './DrawingCanvas.css';


class DrawingCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    draw(e) {
        alert(e.pageY);
    }

    render() {
        return (
            <div className="tc">
                <canvas className="DrawingCanvas" width={this.props.width} height={this.props.height} 
                onClick={(e) => this.draw(e)}>

                </canvas>
                {/* <p>{props.width + props.height}</p> */}
            </div>
        );
    }
}

export default DrawingCanvas;