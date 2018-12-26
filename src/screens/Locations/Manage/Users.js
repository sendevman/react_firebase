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
			selected: [],
			accessUserList: locations.length > 0 ? _.find(locations, { fbId: storeId }).users.map(user => _.find(users, { fbId: user })) : [],
			rAccessUserList: [],
			accessUser: {},
			accessUserIndex: null,
		};
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
			this.setState({ selected });
		}
		if (users.length > 0 && locations.length > 0) {
			this.setState({
				accessUserList: _.find(locations, { fbId: storeId }).users.map(user => _.find(users, { fbId: user })),
			});
		}
	}

	deleteUsers = () => {
		const { accessUserList, accessUser } = this.state;
		const { storeId } = this.props;
		const data = accessUserList.slice();
		_.remove(data, { email: accessUser.email });
		this.setState({
			accessUserList: data,
		});
		this.props.updateAccessUserList('locations', storeId, { users: data.map(item => item.fbId) });
	}

	addUsers = () => {
		const { accessUserList, rAccessUserList } = this.state;
		const { storeId } = this.props;
		if (rAccessUserList.length > 0) {
			const data = _.uniq(accessUserList.concat(rAccessUserList), 'email');
			this.setState({
				accessUserList: data,
				rAccessUserList: [],
				selected: [],
			});
			this.props.updateAccessUserList('locations', storeId, { users: data.map(item => item.fbId) });
		}
	}

	handleSelect = (row) => {
		const selected = JSON.parse(JSON.stringify(this.state.selected));
		selected[row.email] = !selected[row.email];
		const data = [];
		_.each(_.keys(selected), item => {
			if (selected[item]) {
				data.push(_.find(this.props.users, { email: item }));
			}
		});
		this.setState({
			selected,
			rAccessUserList: data,
		});
	}

	handleAccessListClick = (row, index) => {
		this.setState({
			accessUser: row,
			accessUserIndex: index,
		});
	}

	updateCurrentRowStyle = (state, rowInfo) => ({
		style: {
			background: rowInfo && rowInfo.index === this.state.accessUserIndex ? 'green' : null,
		},
	});

	render() {
		const { accessUserList } = this.state;
		const { users } = this.props;
		const accessUsersColumn = [
			{
				Header: () => this.renderHeader('Email'),
				Cell: ({ row, index }) => this.renderCell(row.email, () => this.handleAccessListClick(row, index)),
				accessor: 'email',
			},
			{
				Header: () => this.renderHeader('Name'),
				Cell: ({ row, index }) => this.renderCell(row.name, () => this.handleAccessListClick(row, index)),
				accessor: 'name',
			},
			{
				Header: () => this.renderHeader('User Type'),
				Cell: ({ row, index }) => this.renderCell(row.group, () => this.handleAccessListClick(row, index)),
				accessor: 'group',
			},
		];
		const locationUsersColumn = [
			{
				Header: '',
				/* eslint react/prop-types: 0 */
				Cell: ({ row }) => (
					<input
						type="checkbox"
						className="checkbox"
						checked={this.state.selected[row.email] === true}
						onChange={() => this.handleSelect(row)}
					/>
				),
				width: 50,
			},
			{
				Header: () => this.renderHeader('Email'),
				accessor: 'email',
			},
			{
				Header: () => this.renderHeader('Name'),
				accessor: 'name',
			},
			{
				Header: () => this.renderHeader('User Type'),
				accessor: 'group',
			},
		];
		return (
			<div id="locations-man-info" className="Container-box">
				<Grid container spacing={24}>
					{this.renderGrid('dark-purple',
						<TableList
							label="Users Access"
							tables={accessUserList}
							columns={accessUsersColumn}
							deletebtnTooltip="Delete User"
							deletebtn
							handleDelete={this.deleteUsers}
							updateRowStyle={this.updateCurrentRowStyle}
					/>)}
					{this.renderGrid('dark-purple',
						<TableList
							columns={locationUsersColumn}
							tables={users}
							label="Add Managers / Users to location"
							addbtnTooltip="Add User"
							addbtn
							searchEnable
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
