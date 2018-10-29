import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';

import InputEvent from 'components/InputEvent';

class GeneralInfo extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      storeId: '',
      city: '',
      state: '',
      reigon: '',
      type: '',
      fileName: '',
      floorId1: '',
      floorId2: '',
      autoUpdate: false,
      dbID: '',
      cpID: '',
      subtype: '',
    };
  }

  upload = () => {
  }

  render() {
    const {
      name,
      storeId,
      city,
      state,
      reigon,
      type,
      fileName,
      floorId1,
      floorId2,
      autoUpdate,
      dbID,
      cpID,
      subtype,
    } = this.state;
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent className="left-border-orange">
            <Grid container>
              <Grid item xs={12} sm={6}>
                <div className="sub-container">
                  <FormLabel component="legend">General Info</FormLabel>
                  <FormGroup>
                    {this.subrender('name', 'Name', name)}
                    {this.subrender('storeId', 'Store ID', storeId)}
                    {this.subrender('dbID', 'DBID', dbID)}
                    {this.subrender('cpID', 'CPID', cpID)}
                    {this.subrender('city', 'City', city)}
                    {this.subrender('state', 'State', state)}
                    {this.subrender('reigon', 'Reigon', reigon)}
                    {this.subrender('type', 'Type', type)}
                    {this.subrender('subtype', 'Subtype', subtype)}
                  </FormGroup>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="sub-container">
                  <FormLabel component="legend">Walkbase</FormLabel>
                  <FormGroup>
                    {this.subrender('floorId1', 'Floor ID1', floorId1)}
                    {this.subrender('floorId2', 'Floor ID2', floorId2)}
                  </FormGroup>
                </div>
                <div className="sub-container">
                  <FormLabel component="legend" className="mt-block">Floorplan Upload</FormLabel>
                  <FormGroup>
                    <div className="d-flex">
                      {this.subrender('fileName', 'File Name.png', fileName)}
                      <Button
                        className="btn-icon-text att-green margin-top-30 margin-left"
                        variant="contained"
                        size="small"
                        onClick={this.upload}>
                        Upload
                      </Button>
                    </div>
                  </FormGroup>
                </div>
                <div className="sub-container">
                  <FormLabel component="legend" className="mt-block">IPog Info</FormLabel>
                  <FormGroup>
                    <div className="mt-block default-text-color">Last Update</div>
                    <FormControlLabel
                      label="Auto Update"
                      control={
                        <Checkbox
                          checked={autoUpdate}
                          onChange={e => this.handleCheckChange(e, 'autoUpdate')}
                          value="autoUpdate" />
                      }
                    />
                  </FormGroup>
                </div>
                <div className="buttons-box mt-block">
                  <Tooltip title="Refresh Ipog Data" placement="top">
                    <Button
                      className="btn-icon-text att-orange margin-top margin-left"
                      variant="contained"
                      size="small"
                      aria-label="Refresh"
                      onClick={this.refresh}>
                      <RefreshIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Save" placement="top">
                    <Button
                      className="btn-icon-text att-orange margin-top margin-left"
                      variant="contained"
                      size="small"
                      aria-label="Save"
                      onClick={this.save}>
                      <SaveIcon />
                    </Button>
                  </Tooltip>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default GeneralInfo;
