import React, { Component } from 'react';
// import Navigation from './components/Navigation/Navigation';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import Toolbox from './components/Toolbox/Toolbox';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Toolbox />
                <DrawingCanvas />
            </div>
        );
    }
}

export default App;