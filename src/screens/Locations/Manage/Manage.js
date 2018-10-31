import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Info from './Info';

class LocationsManTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { value } = this.state;
    return (
      <div id="locations-man-tab" className="Container-box">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Info" />
            <Tab label="Users" />
            <Tab label="Zones" />
            <Tab label="Products" />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <Typography component="div" style={{ padding: 8 * 3, width: '90%' }}>
            <Info storeId={this.props.match.params.store_id} />
          </Typography>}
        {value === 1 &&
          <Typography component="div" style={{ padding: 8 * 3 }}>
            Users
          </Typography>}
        {value === 2 &&
          <Typography component="div" style={{ padding: 8 * 3 }}>
            Zones
          </Typography>}
        {value === 2 &&
          <Typography component="div" style={{ padding: 8 * 3 }}>
            Products
          </Typography>}
      </div>
    );
  }
}

LocationsManTab.propTypes = {
  match: PropTypes.object.isRequired,
};

export default LocationsManTab;
