import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import List from 'components/List';
import SearchList from 'components/SearchList';

import { getUsers } from 'redux/firebase/actions';
import { usersSelector } from 'redux/firebase/selectors';

class LocationsManUsers extends Component {
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

	render() {
		const accessUsersColumn = [
			{
				Header: () => (
					<div>
						<span>email</span>
					</div>
				),
				accessor: 'email',
			},
			{
				Header: () => (
					<div>
						<span>name</span>
					</div>
				),
				accessor: 'name',
			},
			{
				Header: () => (
					<div>
						<span>user type</span>
					</div>
				),
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
					<Grid item xs={12}>
						<Card>
							<CardContent className="left-border-dark-purple">
								<List
									label="Users Access"
									tables={this.props.users}
									columns={accessUsersColumn}
									deletebtn={false}
									handleDelete={this.deleteUsers}
								/>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card>
							<CardContent className="left-border-dark-purple">
								<SearchList
									columns={locationUsersColumn}
									tables={this.props.users}
									label="Add Managers / Users to location"
									savebtnTooltip="Save"
									addbtn={false}
									handleSave={this.saveUsers} />
							</CardContent>
						</Card>
					</Grid>
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

LocationsManUsers.propTypes = {
	storeId: PropTypes.string,
};

LocationsManUsers.defaultProps = {
	storeId: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsManUsers);
