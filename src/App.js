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
    render() {
        return (
            <div className="App">
                <Toolbox  />
                <DrawingCanvas />
                <h1>{this.brushcolor}</h1>
                {console.log(this.brushcolor)}
            </div>
        );
    }
}

export default App;