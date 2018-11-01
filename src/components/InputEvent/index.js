import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

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

  renderText = (name, label) => (
    <TextField
      className="Text-Field"
      type="text"
      name={name}
      label={label}
      value={this.state[name]}
      onChange={e => this.handleInputChange(e, name)}
      required
      margin="normal"
    />
  );

  renderButton = (title, color, handleOnClick, child, shape = 'contained') => (
    <Tooltip title={title} placement="top">
      <Button
        variant={shape}
        aria-label={title}
        className={`btn-icon-text att-${color} margin-top margin-left`}
        onClick={handleOnClick}>
        {child}
      </Button>
    </Tooltip>
  );
}

export default InputEvent;
