import React, { Component } from 'react';
// import Navigation from './components/Navigation/Navigation';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import Toolbox from './components/Toolbox/Toolbox';
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
            width: window.innerWidth
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

onRouteChange = (route) => {
    if (route === 'signout') {
        this.setState({ isSignedIn: false })
    } else if (route === 'create') {
        this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
}

render() {
    const { background, isSignedIn, route, width } = this.state;
    return (
        <div className="App">
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} onresize={this.handleResize}/>
            {
                route === 'create'
                    ?
                    <div className='flex center'>
                        <div className='toolbox tc center w-20'>
                            <ChromePicker
                                color={background}
                                onChange={this.handleChangeComplete}
                            />
                        </div>
                        <DrawingCanvas 
                        brushcolor={background} 
                        width={'400px'}
                        height={'400px'}    
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