import React, { Component } from 'react';
// import Navigation from './components/Navigation/Navigation';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
//import Toolbox from './components/Toolbox/Toolbox';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import { ChromePicker } from 'react-color';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: '#000',
            route: 'create',
            isSignedIn: false,
            pictures: []
        }
    }

handleResize = () => {
    this.setState({width: window.innerWidth});
    console.log(this.state.width);
}

handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    console.log(this.state.background);
}

undo = () => {

}

redo = () => {
    
}

componentDidMount() {
}

onRouteChange = (route) => {
    if (route === 'signout') {
        this.setState({ isSignedIn: false })
    } else if (route === 'create' || route ==='browse') {
        this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
}

render() {
    const { background, isSignedIn, route } = this.state;
    return (
        <div className="App">
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} onresize={this.handleResize}/>
            {
                route === 'create'
                    ?
                    <div className='flex center'>
                        <div className='toolbox bg-washed-red w-20'>
                            <ChromePicker
                                className='w-100'
                                color={background}
                                onChange={this.handleChangeComplete}
                                
                            />
                            {/* <button value="undo">Undo</button>
                            <button value="undo">Redo</button>
                            <button value="Fill">Fill</button> */}
                        </div>
                        <DrawingCanvas 
                        brushcolor={background} 
                        width={'400px'}
                        height={'400px'}
                        ref={this.DrawingCanvas}    
                        />
                    </div>
                    : (route === 'signin' ? <Signin onRouteChange={this.onRouteChange} /> :
                        <Register onRouteChange={this.onRouteChange} />)

            }
        </div>
    );
}
}

//<Toolbox brushcolor={this.brushcolor}/>
//IS HOW WE PASS PROPS DOWN TO CHILDREN, AND THEN CALL THEM VIA THIS.PROPS.BRUSHCOLO IN OTHER COMPONENT

export default App;