import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

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

  upload = () => {
    // const target = event.target;
    // const file = target.files[0];

    // if (file) {
    //   this.setState({ image: file.name });
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.setState({ imgSrc: reader.result, file });
    //   };
    //   reader.readAsDataURL(file);
    // } else {
    //   this.setState({ image: '' });
    // }
  }


  refresh = () => {}
  save = () => {}

  render() {
    const { autoUpdate } = this.state;
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div className="sub-container">
            <FormLabel component="legend">General Info</FormLabel>
            <FormGroup>
              {this.renderText('name', 'Name')}
              {this.renderText('storeId', 'Store ID')}
              {this.renderText('dbID', 'DBID')}
              {this.renderText('cpID', 'CPID')}
              {this.renderText('city', 'City')}
              {this.renderText('state', 'State')}
              {this.renderText('region', 'Reigon')}
              {this.renderText('type', 'Type')}
              {this.renderText('subtype', 'Subtype')}
            </FormGroup>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="sub-container">
            <FormLabel component="legend">Walkbase</FormLabel>
            <FormGroup>
              {this.renderText('floorId1', 'Floor ID1')}
              {this.renderText('floorId2', 'Floor ID2')}
            </FormGroup>
          </div>
          <div className="sub-container">
            <FormLabel component="legend" className="mt-block">Floorplan Upload</FormLabel>
            <FormGroup>
              <div className="d-flex">
                {this.renderText('fileName', 'File Name.png')}
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
