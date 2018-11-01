import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Info from './Info';
import User from './User';

class LocationsManTab extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    let value = '';
    if (match.params.tab === 'info') {
      value = 0;
    } else if (match.params.tab === 'users') {
      value = 1;
    } else if (match.params.tab === 'zones') {
      value = 2;
    } else {
      value = 3;
    }
    this.state = {
      value,
    };
  }

  handleChange = (e, value) => {
    const { history, match } = this.props;
    this.setState({ value });
    if (value === 0) {
      history.push(`/locations/manage/${match.params.store_id}/info`);
    } else if (value === 1) {
      history.push(`/locations/manage/${match.params.store_id}/users`);
    } else if (value === 2) {
      history.push(`/locations/manage/${match.params.store_id}/zone`);
    } else {
      history.push(`/locations/manage/${match.params.store_id}/products`);
    }
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
          <Typography component="div" style={{ padding: 8 * 3, width: '90%' }}>
            <User />
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
  history: PropTypes.object.isRequired,
};

export default LocationsManTab;
