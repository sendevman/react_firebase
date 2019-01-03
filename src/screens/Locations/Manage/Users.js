/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import TableList from 'components/TableList';
import InputEvent from 'components/InputEvent';

import { addDocField, getLocations, getUsers } from 'redux/firebase/actions';
import { locationsSelector, usersSelector } from 'redux/firebase/selectors';

class LocationsManUsers extends InputEvent {
	constructor(props) {
		super(props);

		const { locations, storeId, users } = props;
		this.state = {
			accessUserList: (locations.length > 0 && users.length > 0) ? _.find(locations, { fbId: storeId }).users.map(user => _.find(users, { fbId: user })) : [],
			accessUser: {},
			accessUserIndex: [],
			pageSize: 10,
			selectedRows: { data: [], lookup: {} },
		};
		this.selected = {};
		this.rAccessUserList = [];
	}

	componentDidMount() {
		const { locations, users } = this.props;
		if (users.length === 0) {
			this.props.getUsers();
		}
		if (locations.length === 0) {
			this.props.getLocations();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { locations, storeId, users } = nextProps;
		if (this.props.users !== users && users.length > 0) {
			const selected = {};
			_.each(users, user => {
				selected[user.email] = false;
			});
			this.selected = selected;
		}
		if (users.length > 0 && locations.length > 0) {
			this.setState({
				accessUserList: _.find(locations, { fbId: storeId }).users.map(user => _.find(users, { fbId: user })),
			});
		}
	}

	getLocationUsersList = () => {
		const { users } = this.props;

		const newList = [];
		if (users.length > 0) {
			users.forEach(item => {
				const newItem = [
					item.name || '',
					item.email || '',
					item.group || '',
				];
				newList.push(newItem);
			});
		}
		return newList;
	};

	getAccessUserList = () => {
		const { accessUserList } = this.state;

		const newList = [];
		if (accessUserList.length > 0) {
			accessUserList.forEach(item => {
				const newItem = [
					item.name || '',
					item.email || '',
					item.group || '',
				];
				newList.push(newItem);
			});
		}
		return newList;
	}

	deleteUsers = () => {
		const { accessUserList, accessUser } = this.state;
		const { storeId } = this.props;
		const data = accessUserList.slice();
		_.remove(data, { email: accessUser[1] });
		this.setState({
			accessUserList: data,
		});
		this.props.updateAccessUserList('locations', storeId, { users: data.map(item => item.fbId) });
	}

	addUsers = () => {
		const { accessUserList } = this.state;
		const { storeId } = this.props;
		if (this.rAccessUserList.length > 0) {
			const data = _.uniq(accessUserList.concat(this.rAccessUserList), 'email');
			this.setState({
				accessUserList: data,
			});
			this.rAccessUserList = [];
			this.selected = [];
			this.props.updateAccessUserList('locations', storeId, { users: data.map(item => item.fbId) });
		}
	}

	handlePageSizeSelected = size => {
		this.setState({ pageSize: size });
	};

	handleRowsSelected = index => {
		this.setState({
			accessUser: this.getAccessUserList()[index],
			accessUserIndex: [index],
		});
	}

	handleSelectedRows = (dataRows, selectedRows) => {
		const selected = {};
		_.each(selectedRows.data, item => {
			selected[dataRows.data[item.index].data[1]] = true;
		});
		const data = [];
		_.each(_.keys(selected), item => {
			if (selected[item]) {
				data.push(_.find(this.props.users, { email: item }));
			}
		});
		this.selected = selected;
		this.rAccessUserList = data;
	};

	render() {
		const { accessUserIndex, pageSize, selectedRows } = this.state;

		const accessUsersColumn = [
			{ name: 'Email' },
			{ name: 'Name' },
			{ name: 'User Type' },
		];
		const locationUsersColumn = [
			{ name: 'Email' },
			{ name: 'Name' },
			{ name: 'User Type' },
		];

		const locationUsers = this.getLocationUsersList();
		const accessUsers = this.getAccessUserList();

		return (
			<div id="locations-man-info" className="Container-box">
				<Grid container spacing={24}>
					{this.renderGrid('dark-purple',
						<TableList
							label="Users Access"
							tables={accessUsers}
							columns={accessUsersColumn}
							deletebtnTooltip="Delete User"
							deletebtn
							pageSize={pageSize}
							multiSelectEnable={false}
							selectableRowsEnable={false}
							rowsSelected={accessUserIndex}
							handlePageSizeSelected={this.handlePageSizeSelected}
							handleRowsSelected={this.handleRowsSelected}
							handleDelete={this.deleteUsers} />)}

					{this.renderGrid('dark-purple',
						<TableList
							columns={locationUsersColumn}
							tables={locationUsers}
							label="Add Managers / Users to location"
							addbtnTooltip="Add User"
							addbtn
							searchEnable
							pageSize={pageSize}
							selectableRowsEnable
							selectedRows={selectedRows}
							handlePageSizeSelected={this.handlePageSizeSelected}
							handleSelectedRows={this.handleSelectedRows}
							handleAdd={this.addUsers} />)}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: usersSelector(state),
	locations: locationsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getUsers: () => dispatch(getUsers()),
	getLocations: () => dispatch(getLocations()),
	updateAccessUserList: (field, id, accessUserList) => dispatch(addDocField(field, id, accessUserList)),
});

LocationsManUsers.propTypes = {
	storeId: PropTypes.string.isRequired,
	users: PropTypes.array,
	locations: PropTypes.array,
	getUsers: PropTypes.func.isRequired,
	getLocations: PropTypes.func.isRequired,
	updateAccessUserList: PropTypes.func.isRequired,
};

LocationsManUsers.defaultProps = {
	users: [],
	locations: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsManUsers);
