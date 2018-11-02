import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class SelectZone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedZone: '',
      zones: [
        {
          id: '7fIwSBVzeaCyMKeSUCcr',
          name: 'Apple',
          walkbaseId: 1012,
        }, {
          id: 'CgNVTMmweMaxWhgoCt1x',
          name: 'Samsung',
          walkbaseId: 1011,
        },
      ],
    };
  }

  componentWillMount() {
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleInputChange = (event, type) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type] = event.target.value;
    this.setState({ ...stateCopy });
  };

  render() {
    const { selectedZone, zones } = this.state;

    return (
      <Grid item xs={12}>
        <div className="label-products-table select-text">Select Zone</div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <FormControl className="select-zone-box">
              <InputLabel htmlFor="zone-name-helper">Zone Name - Walkbase ID</InputLabel>
              <Select
                value={selectedZone}
                onChange={e => this._handleInputChange(e, 'selectedZone')}
                input={<Input name="selectedZone" id="zone-name-helper" />}>
                <MenuItem value=""><em>None</em></MenuItem>
                { zones.map(zone => (
                  <MenuItem key={zone.id} value={zone.id}>{zone.name} - {zone.walkbaseId}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default SelectZone;
