import React, { Component } from 'react';

// React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class ProductsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      tables: [],
      columns: [
        {
          Header: () => (<span>Model</span>),
          accessor: 'email',
        }, {
          Header: () => (<span>Manufacture</span>),
          accessor: 'email',
        }, {
          Header: () => (<span>ID</span>),
          accessor: 'email',
        }, {
          Header: () => (<span>Type</span>),
          accessor: 'email',
        }, {
          Header: () => (<span>Subtype</span>),
          accessor: 'email',
        },
      ],
    };
  }

  componentWillMount() {
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleInputChange = (event) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy['search'] = event.target.value;
    this.setState({ ...stateCopy });
  };

  render() {
    const { columns, search, tables } = this.state;

    return (
      <div>
        <Grid item xs={12} sm={6}>
          <TextField
            className="w-100"
            type="text"
            name="search"
            label="Search"
            value={search}
            onChange={this._handleInputChange}
            margin="normal"
          />
        </Grid>

        <ReactTable
          className="-striped -highlight"
          data={tables}
          showPagination={false}
          defaultPageSize={6}
          sorted={[{ id: 'name', desc: false }]}
          columns={columns}
        />
      </div>
    );
  }
}

export default ProductsTable;
