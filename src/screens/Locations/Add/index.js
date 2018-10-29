import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import GeneralInfo from 'components/GeneralInfo';
import Managers from './Managers';

class LocationsAdd extends Component {
  render() {
    return (
      <div id="locations-add" className="Container-box">
        <Card>
          <CardContent className="left-border-dark-green">
            <div className="container-label">Add Location</div>
            <Grid container spacing={24}>
              <GeneralInfo />
              <Managers />
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LocationsAdd;
