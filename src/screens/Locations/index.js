import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import InputEvent from 'components/InputEvent';
import SearchList from 'components/SearchList';

import { getUsers, getLocations } from 'redux/firebase/actions';
import { usersSelector, locationsSelector } from 'redux/firebase/selectors';

class Locations extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      tables: [],
      columns: [
        {
          Header: () => (
            <div>
              <span>email</span>
            </div>
          ),
          accessor: 'email',
          width: 200,
        },
        {
          Header: () => (
            <div>
              <span>name</span>
            </div>
          ),
          accessor: 'email',
          width: 200,
        },
        {
          Header: () => (
            <div>
              <span>user type</span>
            </div>
          ),
          accessor: 'email',
          width: 200,
        },
      ],
    };
  }

  render() {
    const { tables, columns } = this.state;
    return (
      <div id="locations" className="Container-box">
        <Card>
          <CardContent>
            <Grid item xs={12}>
              <div className="border-shadow">
                <Grid container>
                  <SearchList
                    columns={columns}
                    tables={tables}
                    label="Select a location to manage" />
                </Grid>
              </div>
            </Grid>
          </CardContent>
        </Card>
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
});

Locations.propTypes = {
  users: PropTypes.array,
  locations: PropTypes.array,
  getUsers: PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
};

Locations.defaultProps = {
  users: [],
  locations: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
