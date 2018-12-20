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
      search: '',
      tables,
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
        tables.push({
          storeId: location.storeId,
          ...location.storeInfo,
          fbId: location.fbId,
        });
      }
    });
    return tables;
  }

  addLocations = () => {
    this.props.history.push('/locations/add');
  }

  handleOnClick = (row) => {
    this.props.history.push(`/locations/manage/${row._original.fbId}/info`);
  }

  render() {
    const { tables } = this.state;
    const columns = [
      {
        Header: () => this.renderHeader('Name'),
        Cell: ({ row }) => this.renderCell(row.name, () => this.handleOnClick(row)),
        accessor: 'name',
      },
      {
        Header: () => this.renderHeader('Store ID'),
        Cell: ({ row }) => this.renderCell(row.storeId, () => this.handleOnClick(row)),
        accessor: 'storeId',
      },
      {
        Header: () => this.renderHeader('City'),
        Cell: ({ row }) => this.renderCell(row.city, () => this.handleOnClick(row)),
        accessor: 'city',
      },
      {
        Header: () => this.renderHeader('State'),
        Cell: ({ row }) => this.renderCell(row.state, () => this.handleOnClick(row)),
        accessor: 'state',
      },
      {
        Header: () => this.renderHeader('Region'),
        Cell: ({ row }) => this.renderCell(row.region, () => this.handleOnClick(row)),
        accessor: 'region',
      },
      {
        Header: () => this.renderHeader('Type'),
        Cell: ({ row }) => this.renderCell(row.type, () => this.handleOnClick(row)),
        accessor: 'type',
      },
    ];
    return (
      <div id="locations-manage" className="Container-box">
        <Card style={{ width: '90%' }}>
          <CardContent className="left-border-orange">
            <TableList
              columns={columns}
              tables={tables}
              label="Select a location to manage"
              addbtnTooltip="Add New Location"
              addbtn
              searchEnable
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
  history: PropTypes.object.isRequired,
  getLocations: PropTypes.func.isRequired,
};

Locations.defaultProps = {
  locations: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
