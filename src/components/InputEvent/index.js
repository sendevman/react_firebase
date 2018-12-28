/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

  renderHeader = (header) => (
    <div>
      <span>{header}</span>
    </div>
  );

  renderCell = (cell, handle) => (
    <div onClick={handle}>
      <span>{cell}</span>
    </div>
  );

  renderText = (name, label, className = 'Text-Field', placeholder = '', margin = 'normal', type = 'text') => (
    <TextField
      className={className}
      type={type}
      name={name}
      label={label}
      placeholder={placeholder}
      value={this.state[name]}
      onChange={e => this.handleInputChange(e, name)}
      required
      margin={margin}
    />
  );

  renderButton = (title, color, handleOnClick, child, shape = 'contained', size = 'medium', disabled = false) => (
    <Tooltip title={title} placement="top">
      <div>
        <Button
          variant={shape}
          size={size}
          aria-label={title}
          className={`btn-icon-text att-${color} margin-top margin-left`}
          onClick={handleOnClick}
          disabled={disabled}>
          {child}
        </Button>
      </div>
    </Tooltip>
  );

  renderGrid = (color, child, style = {}, direction = 'left', xSize = 12, sSize = 12) => (
    <Grid item xs={xSize} sm={sSize}>
      <Card style={style}>
        <CardContent className={color !== '' ? `${direction}-border-${color}` : ''}>
          {child}
        </CardContent>
      </Card>
    </Grid>
  );

  renderExpansionPanel = (title, child, index = 0) => (
    <ExpansionPanel key={index}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className="title-features margin-zero item-box">{title}</div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {child}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );

  renderCheckBox = (name, label, className = 'text-field-width', color = 'primary') => (
    <FormControlLabel
      className={className}
      control={
        <Checkbox
          color={color}
          checked={this.state[name]}
          onChange={e => this.handleInputCheckChange(e, name)}
          value={name}
        />}
      label={label}
    />
  );

  renderSelect = (name, label, handleOnChange, children = [], className = 'Text-Field', margin = 'normal') => (
    <FormControl required className={className} margin={margin}>
      <InputLabel htmlFor={`${name}-select`}>{label}</InputLabel>
      <Select
        value={this.state[name]}
        onChange={e => handleOnChange(e, name)}
        inputProps={{
          name: name,
          id: `${name}-select`,
        }}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {children.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default InputEvent;
