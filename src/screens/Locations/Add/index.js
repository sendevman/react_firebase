import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

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
              <Grid item xs={12}>
                <div className="buttons-box mt-block">
                  <Tooltip title="Add Location" placement="top">
                    <Button
                      className="btn-icon-text att-green margin-top margin-left"
                      variant="fab"
                      aria-label="Add">
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default LocationsAdd;
