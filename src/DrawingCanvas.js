import React from 'react';
import './DrawingCanvas.css';


class DrawingCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
        this.painting = false;
    }

    

    componentDidMount() {
    
      }

    draw(e, canvas) {
        if (!this.painting) return;
        let offsetLeft = canvas.offsetLeft - window.scrollX;
        let offsetTop = canvas.offsetTop - window.scrollY;
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = 100;
        ctx.lineCap = "round";
        ctx.strokeStyle = 'red';
        ctx.lineTo(e.clientX - offsetLeft, e.clientY - offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - offsetLeft, e.clientY - offsetTop);
    }

    startPosition(e, canvas){
        this.painting = true;
        this.draw(e, canvas);    //Adding the event here draws it on click to create dots
    }

    finishedPosition(canvas){
        this.painting = false;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
    }

    render() {
        return (
            <div className="tc">
                <canvas className="DrawingCanvas" ref="myCanvas" width={this.props.width} height={this.props.height} 
                onMouseDown={(e) => this.startPosition(e, this.refs.myCanvas)}
                onMouseMove={(e) => this.draw(e, this.refs.myCanvas)}
                onMouseUp={() => this.finishedPosition(this.refs.myCanvas)}>

                </canvas>
                {/* <p>{props.width + props.height}</p> */}
            </div>
        );
    }
}

export default DrawingCanvas;