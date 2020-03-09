import React, { Component } from 'react';
// import Navigation from './components/Navigation/Navigation';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import Toolbox from './components/Toolbox/Toolbox';
import './App.css';

class App extends Component {
    constructor() {
      super();
      this.state = {
      }
    }

    onBrushColour = () => {
        
    }

    render() {
        return (
          <div className="App">
            <DrawingCanvas/>
            <Toolbox/>
          </div>
        );
      }
    }  

export default App;