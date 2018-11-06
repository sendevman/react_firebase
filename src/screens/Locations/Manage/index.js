import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';

import { getLocations } from 'redux/firebase/actions';
import { locationsSelector } from 'redux/firebase/selectors';

class Locations extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      tables: [],
    };
  }

  componentDidMount() {
    this.props.getLocations();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locations !== nextProps.locations) {
      const tables = nextProps.locations.map(location => ({
        storeId: location.storeId,
        ...location.storeInfo,
        city: '',
        state: '',
        type: '',
      }));
      this.setState({ tables });
    }
  }

  addLocations = () => {
    this.props.history.push('/locations/add');
  }

  handleOnClick = (row) => {
    this.props.history.push(`/locations/manage/${row.storeId}/info`);
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
        <Card>
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
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => dispatch(getLocations()),
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
