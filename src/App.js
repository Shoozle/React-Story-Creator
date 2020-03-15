import React, { Component } from 'react';
// import Navigation from './components/Navigation/Navigation';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import Toolbox from './components/Toolbox/Toolbox';
import Navigation from './components/Navigation/Navigation';
import { ChromePicker } from 'react-color';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: '#fff',
            route: 'signin',
            isSignedIn: false
        }
    }

    componentDidMount() {
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
        console.log(this.state.background);
    }

    render() {
        return (
            <div className="App">
            <Navigation />
                <div className="toolbox">
                <ChromePicker
                    color={this.state.background}
                    onChange={this.handleChangeComplete}
                />
                </div>
                <DrawingCanvas brushcolor={this.state.background} />
                <h1>{this.state.background}</h1>
            </div>
        );
    }
}

//<Toolbox brushcolor={this.brushcolor}/>
//IS HOW WE PASS PROPS DOWN TO CHILDREN, AND THEN CALL THEM VIA THIS.PROPS.BRUSHCOLO IN OTHER COMPONENT

export default App;