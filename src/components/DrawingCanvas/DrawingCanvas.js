import React from 'react';
import './DrawingCanvas.css';

class DrawingCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.present = 0;
        this.painting = false;
        this.canvas = React.createRef();
    }

    //State is similar to props, but it is private and fully controlled by the component.
    //In a React component, props are variables passed to it by its parent component. State on the other hand is still variables, but directly initialized and managed by the component.
    //Props should never be changed in a child component, so if there’s something going on that alters some variable, that variable should belong to the component state.

    draw(e) {
        if (!this.painting) return;
        let canvas = this.canvas.current;
        let offsetLeft = canvas.offsetLeft - window.scrollX;
        let offsetTop = canvas.offsetTop - window.scrollY;
        let ctx = canvas.getContext("2d");    
        ctx.lineWidth = 25;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.brushcolor;
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
        this.present++;
    }


    render() {
        const { width, height } = this.props;
        return (
            <div className='tc w-70'>
                <canvas className='DrawingCanvas' width={width} height={height} ref={this.canvas} 
                onMouseDown={(e) => this.startPosition(e)}
                onMouseMove={(e) => this.draw(e)}
                onMouseUp={() => this.finishedPosition()}
                ></canvas>
            </div>
        );
    }
}

export default DrawingCanvas;