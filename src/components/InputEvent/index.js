import { Component } from 'react';
import TextField from '@material-ui/core/TextField';

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

  subrender = (name, label, value) => (
    <TextField
      className="Text-Field"
      type="text"
      name={name}
      label={label}
      value={value}
      onChange={e => this.handleInputChange(e, name)}
      required
      margin="normal"
    />
  );
}

export default InputEvent;
