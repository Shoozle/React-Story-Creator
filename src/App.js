import React, { Component } from 'react';
// import Navigation from './components/Navigation/Navigation';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import Toolbox from './components/Toolbox/Toolbox';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.brushcolor = 'red';
    }

    componentDidMount(){
        console.log('READY');
        this.brushcolor = 'blue';
        console.log(this.props.brushcolor);
    }

    getBrushColor(color){
        console.log(color);
    }

    render() {
        return (
            <div className="App">
                <Toolbox/>
                {console.log(color)}
                <DrawingCanvas />
                <h1>{this.brushcolor}</h1>
                {console.log(this.brushcolor)}
            </div>
        );
    }
}

export default App;