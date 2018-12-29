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

import { addCollectionData, addUsersToLocations, getUsers, getLocations } from 'redux/firebase/actions';
import { usersSelector } from 'redux/firebase/selectors';

class LocationsAdd extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			accessUserList: [],
			accessUser: {},
			accessUserIndex: [],
			genData: {},
			pageSize: 10,
			selectedRows: { data: [], lookup: {} },
		};
		this.selected = {};
		this.rAccessUserList = [];
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
			this.selected = selected;
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
		const data = accessUserList.slice();
		_.remove(data, { email: accessUser[1] });
		this.setState({
			accessUserList: data,
		});
	}

	addUsers = () => {
		const { accessUserList } = this.state;
		if (this.rAccessUserList.length > 0) {
			const data = _.uniq(accessUserList.concat(this.rAccessUserList), 'email');
			this.setState({
				accessUserList: data,
			});
			this.rAccessUserList = [];
			this.selected = {};
		}
	}

	addLocations = () => {
		const location = _.isEmpty(this.state.genData)
			? { users: this.state.accessUserList.map(item => item.fbId) }
			: { ...this.state.genData, users: this.state.accessUserList.map(item => item.fbId) };
		this.props.addLocations(location);
		this.props.getLocations();
		this.props.history.push('/locations/manage');
	}

	handleSave = (data) => {
		this.setState({ genData: data });
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
			<div id="locations-add" className="Container-box">
				<Card style={{ width: '90%' }}>
					<CardContent className="left-border-dark-green">
						<div className="container-label">Add Location</div>
						<Grid container spacing={24}>
							{this.renderGrid('orange', <GeneralInfo type="add" genInfoSave={this.handleSave} />)}

							{this.renderGrid('dark-purple',
								<TableList
									label="Managers / Users added to location"
									tables={accessUsers}
									columns={accessUsersColumn}
									deletebtnTooltip="Delete User"
									deletebtn
									multiSelectEnable={false}
									pageSize={pageSize}
									rowsSelected={accessUserIndex}
									// selectedRows={selectedRows}
									selectableRowsEnable={false}
									handleDelete={this.deleteUsers}
									handlePageSizeSelected={this.handlePageSizeSelected}
									handleRowsSelected={this.handleRowsSelected} />)}

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
