import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

ReactDOM.render(<DrawingCanvas height={'1000rem'} width={'1000rem'}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
