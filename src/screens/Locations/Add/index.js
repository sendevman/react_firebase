import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import GeneralInfo from './Components/GeneralInfo';
import Walkbase from './Components/Walkbase';
import IPog from './Components/IPog';
import Managers from './Components/Managers';

class LocationsAdd extends Component {

  render() {
    return (
      <div id="locations-add" className="Container-box">
        <Card>
          <CardContent>
            <div className="container-label">Add Location</div>
            <Grid container spacing={24}>
              <GeneralInfo />
              <Walkbase />
              <IPog />
              <Managers />
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LocationsAdd;
