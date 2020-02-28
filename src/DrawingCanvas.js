import React from 'react';
import './DrawingCanvas.css';


class DrawingCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.history = [];
        this.painting = false;
    }

    draw(e, canvas) {
        if (!this.painting) return;
        let offsetLeft = canvas.offsetLeft - window.scrollX;
        let offsetTop = canvas.offsetTop - window.scrollY;
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = 25;
        ctx.lineCap = "round";
        ctx.strokeStyle = 'black';
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
        this.state.drawings.push(canvas.toDataURL());
    }

    undo(){

    }
    
    redo(){

    }

    componentDidMount(){
        this.history.push("hey");
        this.history.push("hey");
        console.log(this.history);
    }

    render() {
        return (
            <div className="tc">
                <canvas className="DrawingCanvas" ref="myCanvas" width={this.props.width} height={this.props.height} 
                onMouseDown={(e) => this.startPosition(e, this.refs.myCanvas)}
                onMouseMove={(e) => this.draw(e, this.refs.myCanvas)}
                onMouseUp={() => this.finishedPosition(this.refs.myCanvas)}
                ></canvas>
                <button
                onClick={() => this.undo()}
                >Undo</button>
                <button
                onClick={() => this.redo()}
                >Redo</button>
            </div>
            
        );
    }
}

export default DrawingCanvas;