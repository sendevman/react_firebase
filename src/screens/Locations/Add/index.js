import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

import InputEvent from 'components/InputEvent';

import GeneralInfo from 'components/GeneralInfo';
import Managers from './Managers';

import { addLocations, addUsersToLocations } from 'redux/firebase/actions';
// import { locationsSelector } from 'redux/firebase/selectors';

class LocationsAdd extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      genData: {},
      users: [],
    };
  }

  addLocations = () => {
    this.props.addLocations(this.state.genData, this.state.users);
    this.props.history.push('/locations/manage');
  }

  handleSave = (data) => {
    this.setState({ genData: data });
  }

  handleRefresh = () => {}

  handleUsers = (users) => {
    this.setState({ users });
  }

  render() {
    return (
      <div id="locations-add" className="Container-box">
        <Card>
          <CardContent className="left-border-dark-green">
            <div className="container-label">Add Location</div>
            <Grid container spacing={24}>
              {this.renderGrid('orange',
                <GeneralInfo genInfoSave={this.handleSave} genInfoRefresh={this.refresh} />)}
              <Managers handleUsers={this.handleUsers} />
              <Grid item xs={12}>
                <div className="buttons-box mt-block">
                  {this.renderButton('Add Location', 'green', this.addLocations, <AddIcon />, 'fab')}
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addLocations: (location, user) => dispatch(addLocations(location, user)),
  addUsersToLocations: (data) => dispatch(addUsersToLocations(data)),
});

LocationsAdd.propTypes = {
  addLocations: PropTypes.func.isRequired,
  addUsersToLocations: PropTypes.func.isRequired,
};

LocationsAdd.defaultProps = {
  history: [],
};

export default connect(null, mapDispatchToProps)(LocationsAdd);
