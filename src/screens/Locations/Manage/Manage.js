/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Info from './Info';
import Users from './Users';
import Zones from './Zones';
import Products from './Products';

class LocationsManTab extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    let value = 0;
    if (match.params.tab === 'info') {
      value = 0;
    } else if (match.params.tab === 'users') {
      value = 1;
    } else if (match.params.tab === 'zones') {
      value = 2;
    } else if (match.params.tab === 'products') {
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
      history.push(`/locations/manage/${match.params.store_id}/zones`);
    } else if (value === 3) {
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
            <Tab className={value === 0 ? 'info' : ''} label="Info" />
            <Tab className={value === 1 ? 'users' : ''} label="Users" />
            <Tab className={value === 2 ? 'zones' : ''} label="Zones" />
            <Tab className={value === 3 ? 'products' : ''} label="Products" />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <div style={{ padding: 8 * 3, width: '90%' }}>
            <Info storeId={this.props.match.params.store_id} />
          </div>}
        {value === 1 &&
          <div style={{ padding: 8 * 3, width: '90%' }}>
            <Users storeId={this.props.match.params.store_id} />
          </div>}
        {value === 2 &&
          <div style={{ padding: 8 * 3, width: '90%' }}>
            <Zones storeId={this.props.match.params.store_id} />
          </div>}
        {value === 3 &&
          <div style={{ padding: 8 * 3 }}>
            <Products storeId={this.props.match.params.store_id} />
          </div>}
      </div>
    );
  }
}

LocationsManTab.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default LocationsManTab;
