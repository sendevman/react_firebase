/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

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

class GeneralInfo extends InputEvent {
  constructor(props) {
    super(props);

    const data = {
      name: '',
      storeId: '',
      city: '',
      state: '',
      region: '',
      type: '',
      fileName: '',
      autoUpdate: false,
      dbID: '',
      cpID: '',
      subtype: '',
    };
    if (props.type === 'add') {
      data.floorId1 = '';
      data.floorId2 = '';
      data.walkbase = { floorId: ['1', '2'] };
    }
    this.state = { ...data };
  }

  componentDidMount() {
    this.props.getLocations();
    if (this.props.type === 'add') {
      this.save();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data && this.props.storeId !== '') {
      if (nextProps.data.fbId) {
        const { storeId, storeInfo } = nextProps.data;
        const walkbase = nextProps.data.walkbase ? { ...nextProps.data.walkbase } : null;
        const walkbase_keys = _.keys(walkbase);
        const walkbase_state = {};
        _.each(walkbase_keys, key => {
          if (Array.isArray(walkbase[key])) {
            _.each(walkbase[key], (item, index) => {
              walkbase_state[`${key}${index + 1}`] = item;
            });
          } else {
            walkbase_state[key] = walkbase[key];
          }
        });
        this.setState({
          name: storeInfo.name,
          storeId: storeId || '',
          region: storeInfo.region || '',
          city: storeInfo.city || '',
          state: storeInfo.state || '',
          type: storeInfo.type || '',
          dbID: storeInfo.dbID || '',
          cpID: storeInfo.cpID || '',
          subtype: storeInfo.subtype || '',
          ...walkbase_state,
          walkbase,
        });
      }
    }
  }

  handleInputChange = (e, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		this.setState({ ...stateCopy }, () => (this.props.type === 'add' && this.save()));
  };

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


  refresh = () => {
    this.props.getLocations();
  }

  save = () => {
    const {
      name,
      storeId,
      city,
      state,
      region,
      type,
      floorId1,
      floorId2,
      dbID,
      cpID,
      subtype,
      walkbase,
    } = this.state;
    if (this.props.type === 'add') {
      const data = {
        storeId,
        storeInfo: {
          admin: [],
          name,
          region,
          city,
          state,
          dbID,
          cpID,
          type,
          subtype,
        },
        walkbase: {
          floorId: [floorId1, floorId2],
        },
      };
      this.props.genInfoSave(data);
    } else {
      const walkbase_keys = _.keys(walkbase);
      const walkbase_state = {};
      _.each(walkbase_keys, key => {
        if (Array.isArray(walkbase[key])) {
          walkbase_state[`${key}`] = [];
          _.each(walkbase[key], (item, index) => {
            walkbase_state[`${key}`][index] = parseInt(this.state[`${key}${index + 1}`]) || item;
          });
        } else {
          walkbase_state[key] = this.state[key] || walkbase[key];
        }
      });
      const data = {
        storeId,
        storeInfo: {
          admin: [],
          name,
          region,
          city,
          state,
          dbID,
          cpID,
          type,
          subtype,
        },
        walkbase: walkbase_state,
      };
      this.props.genInfoSave(data);
    }
  }

  render() {
    const { autoUpdate } = this.state;
    const { type } = this.props;

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
              {this.renderText('region', 'Region')}
              {this.renderText('type', 'Type')}
              {this.renderText('subtype', 'Subtype')}
            </FormGroup>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          {this.state.floorId1 !== undefined &&
            <div className="sub-container">
              <FormLabel component="legend">Walkbase</FormLabel>
              <FormGroup>
                {this.state.walkbase.floorId.map((item, index) => (
                  <div key={index}>{this.renderText(`floorId${index + 1}`, `Floor ID${index + 1}`)}</div>
                ))}
              </FormGroup>
            </div>}
          {this.state.zoneId1 !== undefined &&
            <div className="sub-container">
              <FormGroup>
                {this.state.walkbase.zoneId.map((item, index) => (
                  <div key={index}>{this.renderText(`zoneId${index + 1}`, `Zone ID${index + 1}`)}</div>
                ))}
              </FormGroup>
            </div>}
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
            {type === 'edit' && this.renderButton('Save', 'orange', this.save, <SaveIcon />)}
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLocations: () => dispatch(getLocations()),
});

GeneralInfo.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  storeId: PropTypes.string,
  genInfoSave: PropTypes.func,
  getLocations: PropTypes.func,
};

GeneralInfo.defaultProps = {
  type: 'edit',
  data: {},
  storeId: '',
  genInfoSave: () => {},
  getLocations: () => {},
};

export default connect(null, mapDispatchToProps)(GeneralInfo);
