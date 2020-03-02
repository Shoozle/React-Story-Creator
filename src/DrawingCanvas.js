import React from 'react';
import './DrawingCanvas.css';
import { ChromePicker } from 'react-color';


class DrawingCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.present = 0;
        this.history = [];
        this.painting = false;
        this.canvas = React.createRef();
        this.state = {
            background: '#fff',
          };
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
      };

    draw(e) {
        if (!this.painting) return;
        let canvas = this.canvas.current;
        let offsetLeft = canvas.offsetLeft - window.scrollX;
        let offsetTop = canvas.offsetTop - window.scrollY;
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = 25;
        ctx.lineCap = "round";
        ctx.strokeStyle = this.state.background;
        ctx.lineTo(e.clientX - offsetLeft, e.clientY - offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - offsetLeft, e.clientY - offsetTop);
    }

    startPosition(e){
        this.painting = true;
        this.draw(e);    //Adding the event here draws it on click to create dots
    }

    finishedPosition(){
        this.painting = false;
        let canvas = this.canvas.current;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        this.history.push(canvas.toDataURL());
        console.log(this.history);
    }

    undo(){

    }
    
    redo(){

    }

    componentDidMount(){
        //
    }

    render() {
        return (
            <div className="tc">
                <canvas className="DrawingCanvas" ref={this.canvas} width={this.props.width} height={this.props.height} 
                onMouseDown={(e) => this.startPosition(e)}
                onMouseMove={(e) => this.draw(e)}
                onMouseUp={() => this.finishedPosition()}
                ></canvas>
                <button
                onClick={() => this.undo()}
                >Undo</button>
                <button
                onClick={() => this.redo()}
                >Redo</button>
                <ChromePicker 
                    color={ this.state.background }
                    onChange={ this.handleChangeComplete}
                />
            </div>
            
        );
    }
}

export default DrawingCanvas;