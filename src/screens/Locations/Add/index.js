/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

import TableList from 'components/TableList';
import InputEvent from 'components/InputEvent';

import GeneralInfo from 'components/GeneralInfo';
// import Managers from './Managers';

import { addCollectionData, addUsersToLocations, getUsers, getLocations } from 'redux/firebase/actions';
import { usersSelector } from 'redux/firebase/selectors';

class LocationsAdd extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			selected: [],
			accessUserList: [],
			rAccessUserList: [],
			accessUser: {},
			accessUserIndex: null,
			genData: {},
		};
	}

	componentDidMount() {
		const { users } = this.props;
		if (users.length === 0) {
			this.props.getUsers();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { users } = nextProps;
		if (this.props.users !== users && users.length > 0) {
			const selected = {};
			_.each(users, user => {
				selected[user.email] = false;
			});
			this.setState({ selected });
		}
	}

	deleteUsers = () => {
		const { accessUserList, accessUser } = this.state;
		const data = accessUserList.slice();
		_.remove(data, { email: accessUser.email });
		this.setState({
			accessUserList: data,
		});
	}

	addUsers = () => {
		const { accessUserList, rAccessUserList } = this.state;
		if (rAccessUserList.length > 0) {
			const data = _.uniq(accessUserList.concat(rAccessUserList), 'email');
			this.setState({
				accessUserList: data,
				rAccessUserList: [],
				selected: [],
			});
		}
	}

	addLocations = () => {
		this.props.addLocations({ ...this.state.genData, users: this.state.accessUserList.map(item => item.fbId) });
		this.props.getLocations();
		this.props.history.push('/locations/manage');
	}

	handleSave = (data) => {
		this.setState({ genData: data });
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
			<div id="locations-add" className="Container-box">
				<Card style={{ width: '90%' }}>
					<CardContent className="left-border-dark-green">
						<div className="container-label">Add Location</div>
						<Grid container spacing={24}>
							{this.renderGrid('orange', <GeneralInfo type="add" genInfoSave={this.handleSave} />)}

							{this.renderGrid('dark-purple',
								<TableList
									label="Managers / Users added to location"
									tables={accessUserList}
									columns={accessUsersColumn}
									deletebtnTooltip="Delete User"
									deletebtn
									handleDelete={this.deleteUsers}
									updateRowStyle={this.updateCurrentRowStyle} />)}

							{this.renderGrid('dark-purple',
								<TableList
									columns={locationUsersColumn}
									tables={users}
									label="Add Managers / Users to location"
									addbtnTooltip="Add User"
									addbtn
									searchEnable
									handleAdd={this.addUsers} />)}

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

const mapStateToProps = state => ({
	users: usersSelector(state),
});

const mapDispatchToProps = dispatch => ({
	addLocations: (location) => dispatch(addCollectionData('locations', location)),
	addUsersToLocations: (data) => dispatch(addUsersToLocations(data)),
	getUsers: () => dispatch(getUsers()),
	getLocations: () => dispatch(getLocations()),
});

LocationsAdd.propTypes = {
	addLocations: PropTypes.func.isRequired,
	addUsersToLocations: PropTypes.func.isRequired,
};

LocationsAdd.defaultProps = {
	history: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsAdd);
