import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import _ from 'lodash';

import SearchList from 'components/SearchList';
import List from 'components/List';

import { getUsers } from 'redux/firebase/actions';
import { usersSelector } from 'redux/firebase/selectors';

class Managers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      selectedUsers: [],
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

  handleSelect = (email) => {
    const selected = JSON.parse(JSON.stringify(this.state.selected));
    selected[email] = !selected[email];
    this.setState({ selected });
  }

  addUsers = () => {
    const selectedUsers = _.filter(this.props.users, user => this.state.selected[user.email]);
    this.setState({ selectedUsers });
  }

  deleteUsers = () => {
    this.setState({ selectedUsers: [] });
  }

  render() {
    const { selectedUsers } = this.state;
    const selectedUsersColumn = [
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
    const allUsersColumn = [{
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
    }].concat(selectedUsersColumn);
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent className="left-border-dark-purple">
            <SearchList
              columns={allUsersColumn}
              tables={this.props.users}
              label="Add Managers / Users to location"
              addbtnTooltip="Add Users"
              savebtn={false}
              handleAdd={this.addUsers} />
            <List
              label="Managers / Users added to location"
              tables={selectedUsers}
              columns={selectedUsersColumn}
              addbtn={false}
              handleDelete={this.deleteUsers}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  users: usersSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
});

Managers.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func.isRequired,
};

Managers.defaultProps = {
  users: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Managers);
