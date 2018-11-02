import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import InputEvent from 'components/InputEvent';
import SearchList from 'components/SearchList';

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

  headerRedner = (header) => (
    <div>
      <span>{header}</span>
    </div>
  );

  cellRender = (cell, title) => (
    <div onClick={() => this.handleOnClick(cell)}>
      <span>{title}</span>
    </div>
  );

  render() {
    const { tables } = this.state;
    const columns = [
      {
        Header: () => this.headerRedner('Name'),
        Cell: ({ row }) => this.cellRender(row, row.name),
        accessor: 'name',
      },
      {
        Header: () => this.headerRedner('Store ID'),
        Cell: ({ row }) => this.cellRender(row, row.storeId),
        accessor: 'storeId',
      },
      {
        Header: () => this.headerRedner('City'),
        Cell: ({ row }) => this.cellRender(row, row.city),
        accessor: 'city',
      },
      {
        Header: () => this.headerRedner('State'),
        Cell: ({ row }) => this.cellRender(row, row.state),
        accessor: 'state',
      },
      {
        Header: () => this.headerRedner('Reigon'),
        Cell: ({ row }) => this.cellRender(row, row.region),
        accessor: 'region',
      },
      {
        Header: () => this.headerRedner('Type'),
        Cell: ({ row }) => this.cellRender(row, row.type),
        accessor: 'type',
      },
    ];
    return (
      <div id="locations-manage" className="Container-box">
        <Card>
          <CardContent className="left-border-orange">
            <SearchList
              columns={columns}
              tables={tables}
              label="Select a location to manage"
              addbtnTooltip="Add New Location"
              savebtn={false}
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
