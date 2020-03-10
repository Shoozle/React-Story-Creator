import React from 'react';
import { ChromePicker } from 'react-color';
import './Toolbox.css';

class Toolbox extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <ChromePicker
        color={ this.state.background }
        onChange={ this.handleChangeComplete }
      />
    );
  }
}

export default Toolbox;