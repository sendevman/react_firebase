/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import InputEvent from 'components/InputEvent';

class Table extends InputEvent {
  render() {
    const { tables, columns, pageSize, showPagination, updateRowStyle } = this.props;
    return (
      <ReactTable
        className="-striped -highlight"
        data={tables}
        showPagination={showPagination}
        defaultPageSize={pageSize}
        getTrProps={updateRowStyle}
        sorted={[{
          id: 'name',
          desc: false,
        }]}
        columns={columns}
      />
    );
  }
}

Table.propTypes = {
  pageSize: PropTypes.number,
  showPagination: PropTypes.bool,
  tables: PropTypes.array,
  columns: PropTypes.array,
  updateRowStyle: PropTypes.func,
};

Table.defaultProps = {
  pageSize: 5,
  showPagination: false,
  tables: [],
  columns: [],
  updateRowStyle: () => ({}),
};

export default Table;
