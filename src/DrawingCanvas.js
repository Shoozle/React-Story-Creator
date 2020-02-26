import React from 'react';
import './DrawingCanvas.css';


class DrawingCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    componentDidMount() {
        const canvas = this.refs.myCanvas
        const ctx = canvas.getContext("2d")

        ctx.onload = () => {
            ctx.lineWidth = 22;
            ctx.lineCap = "round";
            ctx.strokeStyle = 'red';

        }
      }

    draw(e) {
        // if (!painting) return;
        // ctx.lineTo(e.clientX - offsetLeft, e.clientY - offsetTop);
        // ctx.stroke();
        // ctx.beginPath();
        // ctx.moveTo(e.clientX - offsetLeft, e.clientY - offsetTop);
    }

    render() {
        return (
            <div className="tc">
                <canvas className="DrawingCanvas" ref="myCanvas" width={this.props.width} height={this.props.height} 
                onClick={(e) => this.draw(e)}>

                </canvas>
                {/* <p>{props.width + props.height}</p> */}
            </div>
        );
    }
}

export default DrawingCanvas;