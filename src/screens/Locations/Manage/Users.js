import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import List from 'components/List';
import SearchList from 'components/SearchList';
import InputEvent from 'components/InputEvent';

import { getUsers } from 'redux/firebase/actions';
import { usersSelector } from 'redux/firebase/selectors';

class LocationsManUsers extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			selected: [],
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

	saveUsers = () => {}

	headerRedner = (header) => (
		<div>
			<span>{header}</span>
		</div>
	);

	handleSelect = (email) => {
		const selected = JSON.parse(JSON.stringify(this.state.selected));
		selected[email] = !selected[email];
		this.setState({ selected });
	}

	render() {
		const accessUsersColumn = [
			{
				Header: () => this.headerRedner('Email'),
				accessor: 'email',
			},
			{
				Header: () => this.headerRedner('Name'),
				accessor: 'name',
			},
			{
				Header: () => this.headerRedner('User Type'),
				accessor: 'name',
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
				onChange={() => this.handleSelect(row.email)}
				/>
			),
			width: 50,
		}].concat(accessUsersColumn);
		return (
			<div id="locations-man-info" className="Container-box">
				<Grid container spacing={24}>
					{this.renderGrid('dark-purple',
						<List
							label="Users Access"
							tables={this.props.users}
							columns={accessUsersColumn}
							deletebtn={false}
							handleDelete={this.deleteUsers}
					/>)}
					{this.renderGrid('dark-purple',
						<SearchList
							columns={locationUsersColumn}
							tables={this.props.users}
							label="Add Managers / Users to location"
							savebtnTooltip="Save"
							addbtn={false}
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
});

// LocationsManUsers.propTypes = {
// 	storeId: PropTypes.string,
// };

// LocationsManUsers.defaultProps = {
// 	storeId: '',
// };

export default connect(mapStateToProps, mapDispatchToProps)(LocationsManUsers);
