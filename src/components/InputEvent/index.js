import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

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

  renderGrid = (color, child, xSize = 12, sSize = 12) => (
		<Grid item xs={xSize} sm={sSize}>
			<Card>
				<CardContent className={`left-border-${color}`}>
					{child}
				</CardContent>
			</Card>
		</Grid>
	);
}

export default InputEvent;
