import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

import InputEvent from 'components/InputEvent';

import GeneralInfo from 'components/GeneralInfo';
import Managers from './Managers';

class LocationsAdd extends InputEvent {
  render() {
    return (
      <div id="locations-add" className="Container-box">
        <Card>
          <CardContent className="left-border-dark-green">
            <div className="container-label">Add Location</div>
            <Grid container spacing={24}>
              {this.renderGrid('orange',
                <GeneralInfo />)}
              <Managers />
              <Grid item xs={12}>
                <div className="buttons-box mt-block">
                  {this.renderButton('Add Location', 'green', () => {}, <AddIcon />, 'fab')}
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
