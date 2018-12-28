/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';

import { getLocations, getUsers } from 'redux/firebase/actions';
import { locationsSelector, usersSelector } from 'redux/firebase/selectors';

class Locations extends InputEvent {
  constructor(props) {
    super(props);

    const { locations, users } = props;

    let tables = [];
    if ((users.length !== 0) && (locations.length !== 0)) {
      tables = this.getTables(locations, users);
    }

    this.state = {
      pageSize: 10,
      tables,
      selectedRows: { data: [], lookup: {} },
    };
  }

  componentDidMount() {
    const { getLocations, getUsers, locations, users } = this.props;
    if (users.length === 0) {
			getUsers();
		}
		if (locations.length === 0) {
			getLocations();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { locations, users } = nextProps;
    if (locations.length > 0 && users.length > 0) {
      const tables = this.getTables(locations, users);
      this.setState({ tables });
    }
  }

  getTables = (locations, users) => {
    const tables = [];
    _.each(locations, location => {
      if ((location.users.length > 0 &&
          _.findIndex(location.users, item => _.find(users, { fbId: item }).email === localStorage.getItem('email')) > -1) ||
          _.find(users, { email: localStorage.getItem('email') }).group === 'master') {
        tables.push({ storeId: location.storeId, storeInfo: location.storeInfo, ...location.storeInfo, fbId: location.fbId });
      }
    });
    return tables;
  };

  getLocationList = () => {
    const { tables } = this.state;

    const newList = [];
    if (tables.length > 0) {
      tables.forEach(item => {
        const newItem = [
          item.storeInfo.name || '',
          item.storeId || '',
          item.storeInfo.city || '',
          item.storeInfo.state || '',
          item.storeInfo.region || '',
          item.storeInfo.type || '',
        ];
        newList.push(newItem);
      });
    }
    return newList;
  };

  addLocations = () => this.props.history.push('/locations/add');

  handlePageSizeSelected = size => {
    console.log('here1');
    this.setState({ pageSize: size });
  };

  handleRowsSelected = index => this.props.history.push(`/locations/manage/${this.getLocationList()[index][1]}/info`);

  handleSelectedRows = dataRows => {
    console.log('here3');
    this.setState({ selectedRows: dataRows });
  };

  render() {
    const { pageSize, selectedRows } = this.state;
    const columns = [
      { name: 'Name' },
      { name: 'Store ID' },
      { name: 'City' },
      { name: 'State' },
      { name: 'Region' },
      { name: 'Type' },
    ];

    const locationList = this.getLocationList();

    return (
      <div id="locations-manage" className="Container-box">
        <Card style={{ width: '90%' }}>
          <CardContent className="left-border-orange">
            <TableList
              columns={columns}
              tables={locationList}
              title="Select a location to manage"
              pageSize={pageSize}
              selectedRows={selectedRows}
              selectableRowsEnable={false}
              searchEnable
              addbtn
              addbtnTooltip="Add New Location"
              handlePageSizeSelected={this.handlePageSizeSelected}
              handleRowsSelected={this.handleRowsSelected}
              handleSelectedRows={this.handleSelectedRows}
              handleAdd={this.addLocations} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: locationsSelector(state),
  users: usersSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => dispatch(getLocations()),
	getUsers: () => dispatch(getUsers()),
});

Locations.propTypes = {
  locations: PropTypes.array,
  users: PropTypes.array,
  history: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

Locations.defaultProps = {
  locations: [],
  users: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
