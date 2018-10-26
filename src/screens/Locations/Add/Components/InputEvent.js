import { Component } from 'react';

class InputEvent extends Component {
  handleInputChange = (e, type) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type] = e.target.value;
    this.setState({ ...stateCopy });
  };

  handleCheckChange = (e, type) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type] = e.target.checked;
    this.setState({ ...stateCopy });
  };
}

export default InputEvent;
