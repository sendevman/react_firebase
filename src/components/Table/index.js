/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';

import MUIDataTable from "mui-datatables";

class Table extends InputEvent {
  render() {
    const { columns, tables, title, pageSize, searchEnable } = this.props;

    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPageOptions: [5, 10, 20],
      rowsPerPage: pageSize,
      print: false,
      selectableRows: false,
      search: searchEnable,
    };

    return (
      <MUIDataTable
        columns={columns}
        data={tables}
        options={options}
        title={title}
      />
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array,
  tables: PropTypes.array,
  title: PropTypes.string,
  pageSize: PropTypes.number,
  searchEnable: PropTypes.bool,
};

Table.defaultProps = {
  columns: [],
  tables: [],
  title: '',
  pageSize: 5,
  searchEnable: false,
};

export default Table;
