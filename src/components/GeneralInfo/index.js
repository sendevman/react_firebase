import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';

import InputEvent from 'components/InputEvent';

import { getLocations } from 'redux/firebase/actions';
import { locationsSelector } from 'redux/firebase/selectors';

class GeneralInfo extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      storeId: '',
      city: '',
      state: '',
      region: '',
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

  componentDidMount() {
    this.props.getLocations();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locations !== nextProps.locations && this.props.storeId !== '') {
      const { locations } = nextProps;
      const location = _.find(locations, data => this.props.storeId === data.storeId);
      this.setState({
        name: location.storeInfo.name,
        storeId: location.storeId,
        region: location.storeInfo.region,
      });
    }
  }

  upload = () => {}
  refresh = () => {}
  save = () => {}

  render() {
    const {
      name,
      storeId,
      city,
      state,
      region,
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
                    {this.renderText('name', 'Name', name)}
                    {this.renderText('storeId', 'Store ID', storeId)}
                    {this.renderText('dbID', 'DBID', dbID)}
                    {this.renderText('cpID', 'CPID', cpID)}
                    {this.renderText('city', 'City', city)}
                    {this.renderText('state', 'State', state)}
                    {this.renderText('region', 'Reigon', region)}
                    {this.renderText('type', 'Type', type)}
                    {this.renderText('subtype', 'Subtype', subtype)}
                  </FormGroup>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="sub-container">
                  <FormLabel component="legend">Walkbase</FormLabel>
                  <FormGroup>
                    {this.renderText('floorId1', 'Floor ID1', floorId1)}
                    {this.renderText('floorId2', 'Floor ID2', floorId2)}
                  </FormGroup>
                </div>
                <div className="sub-container">
                  <FormLabel component="legend" className="mt-block">Floorplan Upload</FormLabel>
                  <FormGroup>
                    <div className="d-flex">
                      {this.renderText('fileName', 'File Name.png', fileName)}
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
                          value="autoUpdate" />}
                    />
                  </FormGroup>
                </div>
                <div className="buttons-box mt-block">
                  {this.renderButton('Refresh Ipog Data', 'blue', this.refresh, <RefreshIcon />)}
                  {this.renderButton('Save', 'orange', this.save, <SaveIcon />)}
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
	locations: locationsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getLocations: () => dispatch(getLocations()),
});

GeneralInfo.propTypes = {
  locations: PropTypes.array,
  storeId: PropTypes.string,
  getLocations: PropTypes.func.isRequired,
};

GeneralInfo.defaultProps = {
  locations: [],
  storeId: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);
