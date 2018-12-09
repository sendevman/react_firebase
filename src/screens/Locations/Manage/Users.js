import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import TableList from 'components/TableList';
import InputEvent from 'components/InputEvent';

import { setAccessUserList, getUsers } from 'redux/firebase/actions';
import { usersSelector } from 'redux/firebase/selectors';

class LocationsManUsers extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			selected: [],
			accessUserList: [],
			rAccessUserList: [],
			accessUser: {},
			accessUserIndex: null,
		};
	}

	componentDidMount() {
		this.props.getUsers();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.users !== nextProps.users) {
			const selected = {};
			_.each(nextProps.users, user => {
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

	saveUsers = () => {
		const { accessUserList, rAccessUserList } = this.state;
		if (rAccessUserList.length > 0) {
			const data = _.uniq(accessUserList.concat(rAccessUserList), 'email');
			this.setState({
				accessUserList: data,
				rAccessUserList: [],
				selected: [],
			});
			this.props.setAccessUserList(data);
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
				Cell: ({ row, index }) => this.renderCell(row.name, () => this.handleAccessListClick(row, index)),
				accessor: 'group',
			},
		];
		const locationUsersColumn = [{
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
		}].concat(accessUsersColumn);
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
							tables={this.props.users}
							label="Add Managers / Users to location"
							savebtnTooltip="Save"
							savebtn
							searchEnable
							handleSave={this.saveUsers} />)}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: usersSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getUsers: () => dispatch(getUsers()),
	setAccessUserList: (data) => dispatch(setAccessUserList(data)),
});

// LocationsManUsers.propTypes = {
// 	storeId: PropTypes.string,
// };

// LocationsManUsers.defaultProps = {
// 	storeId: '',
// };

export default connect(mapStateToProps, mapDispatchToProps)(LocationsManUsers);
