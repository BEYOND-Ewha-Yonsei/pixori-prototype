'use strict'

import React, { useState } from "react";
import { ChromePicker } from 'react-color'

class ButtonExample extends React.Component {

  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {
    function changeColor(color) {
      setColor(color.hex);
    }
    const [selectedColor, setColor] = useState("000000");
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div>
        <button onClick={this.handleClick}>Pick Color</button>
        {this.state.displayColorPicker ? <div style={popover}>
          <div style={cover} onClick={this.handleClose} />
          <ChromePicker color={selectedColor} onChangeComplete={changeColor} />
        </div> : null}
      </div>
    )
  }
}

export default ButtonExample